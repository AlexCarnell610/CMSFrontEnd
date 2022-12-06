import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Modals } from '@cms-enums';
import { Animal, IBulkWeight } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { AddManyWeights, selectAnimals } from '@cms-ngrx/animal';
import { WarningService } from '@cms-services';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-bulk-weight-modal',
  templateUrl: './bulk-weight-modal.component.html',
  styleUrls: ['./bulk-weight-modal.component.scss'],
})
export class BulkWeightModalComponent implements OnInit {
  selectedFile: File;
  identifier = Modals.BulkWeightModal;
  bulkWeightForm: FormGroup;
  correctWeights: IBulkWeight[];
  notFoundWeights: IBulkWeight[];
  duplicateWeights: IBulkWeight[];
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private readonly store: Store<RootState>,
    private readonly warningService: WarningService
  ) {}

  ngOnInit(): void {
    this.bulkWeightForm = this.fb.group({
      inputFile: [null, Validators.required],
    });
  }

  checkFile(selectedFile: File): void {
    if (selectedFile) {
      this.selectedFile = selectedFile;
      let fileReader = new FileReader();
      this.store.select(selectAnimals).subscribe((animals) => {
        fileReader.onload = (e) => {
          const weightData: string = fileReader.result as string;
          const weightDataArray: string[] = weightData.split('\r\n');

          weightDataArray.pop();
          const mappedWeights = weightDataArray.map((weight) => {
            const currWeight = weight.split(',');

            const newWeight: IBulkWeight = {
              id: currWeight[0],
              weight: currWeight[1],
              date: moment(
                `${currWeight[3]},${currWeight[4]}`,
                'DD/MM/yyyy,HH:mm:SS'
              ).toDate(),
            };
            return newWeight;
          });

          this.correctWeights = mappedWeights.filter(
            (weight) => this.getAnimalIndex(weight, animals) > -1
          );

          this.correctWeights.forEach(
            (weight) =>
              (weight.id = animals.find((animal) =>
                animal.tagNumber.endsWith(weight.id)
              ).tagNumber)
          );

          if (this.correctWeights.length < mappedWeights.length) {
            this.notFoundWeights = mappedWeights.filter(
              (weight) => this.getAnimalIndex(weight, animals) === -1
            );
          }

          if (this.correctWeights.length > 0) {
            const dupedWeightIndexes = []
            this.duplicateWeights = this.correctWeights.filter(
              (weight, index) => {
                const weightIndex = animals
                  .find((animal) => animal.tagNumber === weight.id)
                  .weightData.findIndex(
                    (animalWeight) =>
                      animalWeight.weight === +weight.weight &&
                      animalWeight.weightDate.toDate() === weight.date
                  );
                    if(weightIndex !== -1)dupedWeightIndexes.push(weightIndex)
                  return weightIndex
              }
            );
            dupedWeightIndexes.forEach(index => this.correctWeights.splice(index, 0))
          }
          console.warn(this.correctWeights)
          console.warn(this.notFoundWeights);
          console.warn(this.duplicateWeights);
          
          
        };
      });
      fileReader.readAsText(selectedFile);
    }
  }

  saveWeights(): void {
    if (this.selectedFile && this.correctWeights?.length < 1) {
      this.warningService.show({
        header: 'No Animals found from the file provided',
        body: 'Please check the file and try again',
        isError: true,
        showCloseButton: false,
        buttonText: 'Close',
      });
    } else if (
      this.selectedFile &&
      this.notFoundWeights?.length > 0 &&
      this.correctWeights?.length > 0
    ) {
      this.warningService
        .show({ header: 'Animals not found for all weights' })
        .subscribe((result) => {
          if (result) {
            this.addWeights();
          }
        })
        .unsubscribe();
    }
  }

  private addWeights(): void {
    this.store.dispatch(new AddManyWeights({ weights: this.correctWeights }));
  }

  fileChange(file) {
    console.warn(file);
  }

  get labelText(): string {
    return this.selectedFile?.name || 'Choose File...';
  }

  get fileName(): string {
    return (this.fileInputControl.value as string).split('\\')[2];
  }

  get fileInputControl(): AbstractControl {
    return this.bulkWeightForm.get('inputFile');
  }

  get correctWeightsTemplateData(): {
    weightArray: IBulkWeight[];
    title: string;
  } {
    return { weightArray: this.correctWeights, title: 'Weights Found' };
  }

  get notFoundWeightsTemplateData(): {
    weightArray: IBulkWeight[];
    title: string;
  } {
    return {
      weightArray: this.notFoundWeights,
      title: 'The following tags were not found',
    };
  }

  getAnimalIndex(weight: IBulkWeight, animals: Animal[]): number {
    return animals.findIndex((animal) => animal.tagNumber.endsWith(weight.id));
  }

  mapToTagAndWeight(weights: IBulkWeight[]): { tag: string; weight: string }[] {
    return weights.map((weight) => {
      return { tag: weight.id, weight: weight.weight };
    });
  }
}
