import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Modals } from '@cms-enums';
import { Animal, AnimalWeight, IAnimal, IBulkWeight } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import {
  AddManyWeights,
  AnimalActionTypes,
  selectAnimals,
} from '@cms-ngrx/animal';
import { WarningService } from '@cms-services';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable, of, Subscription, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

interface TableData {
  weightArray: IBulkWeight[];
  title: string;
}

interface WeightDataIndexes {
  id: number;
  weight: number;
  date: number;
  time: number;
}
@Component({
  selector: 'cms-bulk-weight-modal',
  templateUrl: './bulk-weight-modal.component.html',
  styleUrls: ['./bulk-weight-modal.component.scss'],
})
export class BulkWeightModalComponent implements OnInit, AfterViewInit {
  @ViewChild('saveConfirm') saveConfirm: NgbPopover;
  selectedFile: File;
  identifier = Modals.BulkWeightModal;
  bulkWeightForm: UntypedFormGroup;
  correctWeights: IBulkWeight[];
  notFoundWeights: IBulkWeight[];
  duplicateWeights: IBulkWeight[];
  saveResult: { message: string; success: boolean } = {
    message: '',
    success: true,
  };
  editWeight: IBulkWeight = null;

  private annoyingWarningSub: Subscription;
  private subs: Subscription = new Subscription();

  constructor(
    private fb: UntypedFormBuilder,
    private readonly store: Store<RootState>,
    private readonly warningService: WarningService,
    private readonly modalService: NgxSmartModalService,
    private readonly actions$: Actions
  ) {}

  ngOnInit(): void {
    this.bulkWeightForm = this.fb.group({
      inputFile: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.modalService
      .get(Modals.BulkWeightModal)
      .onAnyCloseEventFinished.subscribe(() => {
        this.clearFileAndWeights();
      });
  }

  checkFile(selectedFile: File): void {
    this.clearFileAndWeights();
    if (selectedFile) {
      this.selectedFile = selectedFile;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        const weightData: string = fileReader.result as string;
        const weightDataArray: string[] = weightData.split('\r\n');

        if (weightDataArray[weightDataArray.length - 1] === '') {
          weightDataArray.pop();
        }

        const keys = weightDataArray
          .shift()
          ?.split(',')
          .map((key) => key.toLowerCase());

        if (!this.keysCorrect(keys)) {
          this.warningService.show({
            header: 'Some keys have not been found',
            body: 'Please correct or choose a different file',
            buttonText: 'Close',
            isError: true,
            showCloseButton: false,
          });
          this.clearFileAndWeights();
          return;
        }

        const indexes: WeightDataIndexes = this.determineIndexes(keys);

        const mappedWeights = this.mapWeights(weightDataArray, indexes);
        this.sortWeights(mappedWeights);
      };
      fileReader.readAsText(selectedFile);
    }
  }

  private sortWeights(mappedWeights: IBulkWeight[]): void {
    this.store.select(selectAnimals).subscribe((animals) => {
      this.correctWeights = [];
      this.notFoundWeights = [];
      this.duplicateWeights = [];

      this.correctWeights = mappedWeights.filter(
        (weight) => this.getAnimalIndex(weight, animals) > -1
      );

      this.correctWeights.forEach(
        (weight) =>
          (weight.tagNumber = animals.find((animal) =>
            animal.tagNumber.endsWith(weight.tagNumber)
          ).tagNumber)
      );

      if (this.correctWeights.length < mappedWeights.length) {
        this.notFoundWeights = mappedWeights.filter(
          (weight) => this.getAnimalIndex(weight, animals) === -1
        );
      }

      if (this.correctWeights.length > 0) {
        this.duplicateWeights = this.getDuplicatedWeights(animals);
        this.correctWeights = this.correctWeights.filter((correctWeight) => {
          return !this.duplicateWeights.includes(correctWeight);
        });
      }
    });
  }

  private mapWeights(
    weightDataArray: string[],
    indexes: WeightDataIndexes
  ): IBulkWeight[] {
    let id: number = 0;
    return weightDataArray.map((weight) => {
      const currWeight = weight.split(',');
      const newWeight: IBulkWeight = {
        id,
        tagNumber: currWeight[indexes.id],
        weight: currWeight[indexes.weight],
        date: moment(
          `${currWeight[indexes.date]},${currWeight[indexes.time]}`,
          'DD/MM/yyyy,HH:mm:SS'
        ).toDate(),
      };
      id++;
      return newWeight;
    });
  }

  private determineIndexes(keys: string[]): WeightDataIndexes {
    return {
      id: keys.indexOf('vid'),
      date: keys.indexOf('date'),
      time: keys.indexOf('time'),
      weight: keys.indexOf('weight'),
    };
  }

  private keysCorrect(keys: string[]): boolean {
    return (
      !!keys &&
      ['VID', 'weight', 'date', 'time'].every((checkKey) =>
        keys.includes(checkKey.toLowerCase())
      )
    );
  }

  private getDuplicatedWeights(animals: IAnimal[]): IBulkWeight[] {
    return this.correctWeights.filter((weight) => {
      return (
        this.getAnimalWeightData(weight.tagNumber, animals).findIndex(
          (animalWeight) =>
            animalWeight.weight === +weight.weight &&
            animalWeight.weightDate.isSame(weight.date, 'day')
        ) !== -1
      );
    });
  }

  private getAnimalWeightData(
    tagNumber: string,
    animals: IAnimal[]
  ): AnimalWeight[] {
    return animals.find((animal) => animal.tagNumber === tagNumber).weightData;
  }

  saveWeights(): void {
    if (!this.selectedFile) {
      return;
    }
    if (!this.hasCorrectWeights && !this.hasDuplicateWeights) {
      this.warningService.show({
        header: 'No Animals found from the file provided',
        body: 'Please check the file and try again',
        isError: true,
        showCloseButton: false,
        buttonText: 'Close',
      });
    } else if (this.notFoundWeights?.length > 0 && this.hasDuplicateWeights) {
      this.annoyingWarningSub = this.animalsNotFoundForAllWeightsError()
        .pipe(
          switchMap((result) => {
            return result
              ? this.duplicateWeightsWarning().pipe(
                  map((addDupes) => {
                    return { notAllFound: result, dupes: addDupes };
                  })
                )
              : of({ notAllFound: result, dupes: false });
          })
        )
        .subscribe((actualResult: { notAllFound: boolean; dupes: boolean }) => {
          if (actualResult.notAllFound && actualResult.dupes) {
            this.addWeights(true);
          } else if (actualResult.notAllFound) {
            this.addWeights(false);
          }
          this.annoyingWarningSub.unsubscribe();
        });
    } else if (this.hasDuplicateWeights) {
      let subscription = this.duplicateWeightsWarning().subscribe((result) => {
        if (result) {
          this.addWeights(true);
        }
        subscription.unsubscribe();
      });
    } else if (this.hasNotFoundTags) {
      let subscription = this.animalsNotFoundForAllWeightsError().subscribe(
        (result) => {
          if (result) {
            this.addWeights(false);
          }
          subscription.unsubscribe();
        }
      );
    } else {
      this.addWeights(false);
    }
  }

  private get hasDuplicateWeights(): boolean {
    return this.duplicateWeights?.length > 0;
  }

  private get hasCorrectWeights(): boolean {
    return this.correctWeights?.length > 0;
  }

  private get hasNotFoundTags(): boolean {
    return this.notFoundWeights?.length > 0;
  }

  private duplicateWeightsWarning(): Observable<boolean> {
    return this.warningService
      .show(
        {
          header: 'Duplicate Weights found',
          body: 'Do you want to add them anyway?',
          buttonText: 'Yes',
          isYesNo: true,
          showCloseButton: false,
          allowEscaping: true,
        },
        null,
        false
      )
      .pipe(filter((result) => result !== null));
  }

  private animalsNotFoundForAllWeightsError(): Observable<boolean> {
    return this.warningService
      .show({ header: 'Animals not found for all weights' }, null, false)
      .pipe(filter((result) => result !== null));
  }

  private addWeights(includeDuplicates: boolean): void {
    const payload = [
      ...this.correctWeights,
      ...(includeDuplicates ? this.duplicateWeights : []),
    ];
    if (payload.length > 0) {
      this.subs.add(
        this.actions$
          .pipe(ofType(AnimalActionTypes.UpdateManyAnimalsType))
          .subscribe(() => {
            this.clearFileAndWeights();
            this.handlePopover();
          })
      );
      this.store.dispatch(new AddManyWeights({ weights: payload }));
    }
  }

  private clearFileAndWeights(): void {
    this.selectedFile = null;
    this.correctWeights = [];
    this.notFoundWeights = [];
    this.duplicateWeights = [];
    this.bulkWeightForm.reset();
  }

  private handlePopover() {
    this.saveConfirm.open();
    this.subs.add(
      timer(1500).subscribe(() => {
        this.saveConfirm.close();
      })
    );
  }

  get labelText(): string {
    return this.selectedFile?.name || 'Choose File...';
  }

  get fileInputControl(): AbstractControl {
    return this.bulkWeightForm.get('inputFile');
  }

  get correctWeightsTemplateData(): TableData {
    return { weightArray: this.correctWeights, title: 'Weights Found' };
  }

  get duplicateWeightsTemplateData(): TableData {
    return {
      title: 'Ducplicate Weights found',
      weightArray: this.duplicateWeights,
    };
  }

  get notFoundWeightsTemplateData(): TableData {
    return {
      weightArray: this.notFoundWeights,
      title: 'The following tags were not found',
    };
  }

  getAnimalIndex(weight: IBulkWeight, animals: Animal[]): number {
    return animals.findIndex((animal) =>
      animal.tagNumber.endsWith(weight.tagNumber)
    );
  }

  mapToTagAndWeight(weights: IBulkWeight[]): { tag: string; weight: string }[] {
    return weights.map((weight) => {
      return { tag: weight.tagNumber, weight: weight.weight };
    });
  }

  openEdit(weight: IBulkWeight): void {
    this.editWeight = weight;
    this.modalService.open(Modals.EditBulkWeightModal);
  }

  updateWeight(weight: IBulkWeight): void {
    let allWeights = this.correctWeights
      .concat(this.notFoundWeights)
      .concat(this.duplicateWeights);
    const editedWeightIndex = allWeights.findIndex(
      (bulkWeight) => bulkWeight.id === weight.id
    );
    allWeights.splice(editedWeightIndex, 1);
    allWeights.push(weight);
    this.sortWeights(allWeights);
  }
}
