import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modals } from '@cms-enums';
import { IAnimal, AnimalWeight } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { DeleteWeight, getAnimalByTag } from '@cms-ngrx/animal';
import {
  AnimalUpdateService,
  LoadingPaneService,
  WarningService,
} from '@cms-services';
import { dateValidator, saleWeightValidator } from '@cms-validators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';

enum FormControls {
  Weight = 'weight',
  Date = 'date',
  WeightSelect = 'weightSelect',
  IsSaleWeight = 'isSaleWeight',
  AnimalControl = 'animalControl',
}

@Component({
  selector: 'cms-weight-modal',
  templateUrl: './weight-modal.component.html',
  styleUrls: ['./weight-modal.component.scss'],
})
export class EditWeightModalComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() animal: IAnimal = null;
  @Input() isAddMode = false;
  @ViewChild('p') popover: NgbPopover;
  private subs: Subscription = new Subscription();
  private shortLifeSubs: Subscription = new Subscription();
  public editWeightForm: FormGroup = new FormGroup({});
  public selectedWeight: AnimalWeight = null;
  public showSuccess = false;
  public saveResult: { message: string; success: boolean } = {
    message: '',
    success: true,
  };
  showOverride = false;

  constructor(
    private readonly modalService: NgxSmartModalService,
    private readonly fb: FormBuilder,
    private readonly loadingService: LoadingPaneService,
    private readonly updateService: AnimalUpdateService,
    private readonly warningService: WarningService,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.setUpForm();
    this.trackWeightSelectChanges();
  }

  ngAfterViewInit() {
    const weightModal = this.modalService.get(Modals.Weight);
    weightModal.onAnyCloseEventFinished.subscribe(() => {
      this.clearForm();
      this.selectedWeight = null;
      this.showOverride = false;
      this.shortLifeSubs.unsubscribe();
    });

    weightModal.onOpenFinished.subscribe(() => {
      if (this.isAddMode) {
        this.weightSelect.disable();
      } else {
        this.weightSelect.enable();
      }
      this.shortLifeSubs.add(
        this.store
          .pipe(select(getAnimalByTag(this.animal.tagNumber)))
          .subscribe((ani) => {
            this.animal = ani;
            this.animalControl.setValue(ani);
          })
      );
      this.animalControl.setValue(this.animal);
      this.animalControl.updateValueAndValidity();
      this.date.updateValueAndValidity();
    });
  }

  public getCSSForRadio() {
    if (this.isSaleWeightControl.invalid && this.isSaleWeightControl.dirty) {
      return 'is-invalid';
    } else if (
      this.isSaleWeightControl.valid &&
      this.isSaleWeightControl.dirty
    ) {
      return 'is-valid';
    }
  }

  public getCSSClassForDate() {
    if (this.date.invalid && this.date.dirty) {
      return 'is-invalid';
    } else if (this.date.valid && this.date.dirty) {
      return 'is-valid';
    }
  }

  public closeModal() {
    this.modalService.get(Modals.Weight).close();
  }

  public deleteWeight() {
    this.warningService
      .show({ header: 'Are you sure you want to delete this weight?', body:'', buttonText: "Continue" })
      .subscribe((result) => {
        console.warn(this.selectedWeight.tag);
        
        if (result) {
          
          const loadingSub = this.loadingService.currentLoadingState.pipe(filter(loading => loading)).subscribe(() => {
            console.warn("CLEAR");
            
            this.clearForm()
            loadingSub.unsubscribe()
          })
          this.store.dispatch(new DeleteWeight({weightID: this.selectedWeight.id, animalID: this.animal.tagNumber}))
        }
      });
  }

  public saveChanges(override = false) {
    this.editWeightForm.markAllAsTouched();
    this.markAllAsDirty();
    if (this.editWeightForm.valid || override) {
      this.handlePopoverErrors().subscribe((canContinue) => {
        if (this.isAddMode) {
          if (canContinue) {
            this.loadingService.setLoadingState(true);
            const weight: AnimalWeight = {
              weight: this.weight.value,
              weightDate: this.date.value,
              isSaleWeight: this.isSaleWeightControl.value,
            };
            this.updateService
              .addAnimalWeight(this.animal.tagNumber, weight)
              .then(() => {
                this.loadingService.setLoadingState(false);
                this.clearForm();
                this.handleSuccessPopover();
              });
          } else {
            this.markAllAsDirty();
          }
        } else {
          if (canContinue) {
            this.loadingService.setLoadingState(true);
            const weightUpdate: AnimalWeight = {
              weight: this.weight.value,
              weightDate: this.date.value,
              isSaleWeight: this.isSaleWeightControl.value,
            };

            this.updateService
              .updateAnimalWeight(
                this.selectedWeight.id,
                weightUpdate,
                this.animal
              )
              .then(() => {
                this.loadingService.setLoadingState(false);
                this.handleSuccessPopover();
                this.clearForm();
              });
          } else {
            this.markAllAsDirty();
          }
        }
      });
      this.showOverride = false
    } else {
      this.showOverride =
        this.isSaleWeightControl.errors !== null ||
        this.editWeightForm.get(FormControls.Date).errors !== null;
    }
  }

  private setUpForm() {
    this.editWeightForm = this.fb.group(
      {
        animalControl: null,
        weightSelect: this.fb.control('', Validators.required),
        weight: this.fb.control([], {
          validators: [
            Validators.required,
            Validators.min(10),
            Validators.max(1000),
          ],
          updateOn: 'blur',
        }),
        date: this.fb.control([], [Validators.required, dateValidator()]),
        isSaleWeight: this.fb.control(false),
      },
      { validators: saleWeightValidator(this.isAddMode) }
    );
    this.weightSelect.setValue('');
  }

  private markAllAsDirty() {
    this.weightSelect.markAsDirty();
    this.weight.markAsDirty();
    this.date.markAsDirty();
    this.isSaleWeightControl.markAsDirty();
  }

  private weightDateExists(): boolean {
    const weightDate = moment(this.date.value);
    return (
      this.animal.weightData.findIndex((weight) => {
        return weight.weightDate.format('L') === weightDate.format('L');
      }) !== -1
    );
  }

  private handleSuccessPopover() {
    this.saveResult.message = 'Weight Saved';
    this.saveResult.success = true;
    this.handlePopover(2000);
  }

  private handlePopoverErrors(): Observable<boolean> {
    const output = new BehaviorSubject(null);

    if (!this.isAddMode && this.editWeightForm.valid) {
      if (!this.valuesEdited()) {
        this.saveResult.message = 'No changes made';
        this.saveResult.success = false;
        this.handlePopover(3000);
        output.next(false);
      } else {
        output.next(true);
      }
    } else {
      if (
        this.editWeightForm.valid &&
        !this.weightDateExists() &&
        this.weightDateDiff() <= 2
      ) {
        output.next(true);
      } else if (this.weightDateExists()) {
        this.warningService
          .show({
            header: 'There is already a weight recorded on that day',
          })
          .subscribe((result) => {
            output.next(result);
          });
      } else if (this.weightDateDiff() > 2) {
        this.warningService
          .show({
            header: `The date you entered is more than 2 months ago.`,
          })
          .subscribe((result) => {
            output.next(result);
          });
      } else {
        this.saveResult.message = 'Please fix errors';
        this.saveResult.success = false;
        this.handlePopover(3000);
        output.next(false);
      }
    }
    return output;
  }

  private weightDateDiff(): number {
    return moment().diff(moment(this.date.value), 'months', true);
  }

  private handlePopover(time: number) {
    this.popover.popoverClass = this.getCSSForPopover();
    this.popover.ngbPopover = this.saveResult.message;

    this.popover.open();
    timer(time).subscribe(() => {
      this.popover.close();
    });
  }

  public getCSSForPopover() {
    return this.saveResult.success ? 'update-success' : 'update-error';
  }

  // private getWeightType(): AnimalWeightType {
  //   let output: AnimalWeightType = {
  //     isInitial: false,
  //     isSale: false,
  //   };

  //   switch (this.isSaleWeightControl.value) {
  //     case WeightType.Initial:
  //       output.isInitial = true;
  //       break;
  //     case WeightType.Sale:
  //       output.isSale = true;
  //       break;
  //     default:
  //       break;
  //   }
  //   return output;
  // }

  private trackWeightSelectChanges(): void {
    this.weightSelect.valueChanges.subscribe((value) => {
      this.markAsClean();
      if (value !== '') {
        this.selectedWeight = this.animal.weightData.find(
          (animalWeight) => animalWeight.id == value
        );
        this.updateForm();
      } else {
        this.clearForm();
      }
    });
  }

  private markAsClean() {
    this.weight.markAsPristine();
    this.date.markAsPristine();
    this.isSaleWeightControl.markAsPristine();
  }

  private valuesEdited(): boolean {
    const initialDate = this.selectedWeight?.weightDate.format('YYYY-MM-DD');

    return (
      this.selectedWeight?.weight !== this.weight.value ||
      initialDate !== this.date.value ||
      this.selectedWeight?.isSaleWeight !== this.isSaleWeightControl.value
    );
  }

  private updateForm() {
    this.weight.setValue(this.selectedWeight.weight);
    this.date.setValue(this.selectedWeight.weightDate.format('YYYY-MM-DD'));
    this.isSaleWeightControl.setValue(this.selectedWeight.isSaleWeight);
  }

  private clearForm() {
    this.selectedWeight = null;
    this.weight.reset('', { emitEvent: false });
    this.date.reset('', { emitEvent: false });
    this.weightSelect.reset('', { emitEvent: false });
    this.isSaleWeightControl.reset(false, { emitEvent: false });
  }

  get weight() {
    return this.editWeightForm.get(FormControls.Weight);
  }

  get date() {
    return this.editWeightForm.get(FormControls.Date);
  }

  get isSaleWeightControl() {
    return this.editWeightForm.get(FormControls.IsSaleWeight);
  }

  get weightSelect() {
    return this.editWeightForm.get(FormControls.WeightSelect);
  }

  get animalControl() {
    return this.editWeightForm.get(FormControls.AnimalControl);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
