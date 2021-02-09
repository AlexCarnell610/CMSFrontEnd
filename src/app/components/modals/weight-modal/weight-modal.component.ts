import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modals } from '@cms-enums';
import { Animal, AnimalWeight, AnimalWeightType } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { AnimalUpdateService, LoadingPaneService } from '@cms-services';
import { HttpService } from '@cms-services/http';
import { dateValidator } from '@cms-validators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as Moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription, timer } from 'rxjs';

enum FormControls {
  Weight = 'weight',
  Date = 'date',
  WeightSelect = 'weightSelect',
  WeightType = 'weightType',
}

enum RadioValues {
  Sale = 'isSale',
  Initial = 'isInitial',
  Intermediate = 'isIntermediate',
}
@Component({
  selector: 'cms-weight-modal',
  templateUrl: './weight-modal.component.html',
  styleUrls: ['./weight-modal.component.css'],
})
export class EditWeightModalComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() animal: Animal = null;
  @Input() isAddMode = false;
  @ViewChild('p') popover: NgbPopover;
  private subs: Subscription = new Subscription();
  public editWeightForm: FormGroup = new FormGroup({});
  private selectedWeight: AnimalWeight = null;
  public showSuccess = false;

  constructor(
    private readonly modalService: NgxSmartModalService,
    private store: Store<RootState>,
    private fb: FormBuilder,
    private httpService: HttpService,
    private loadingService: LoadingPaneService,
    private updateService: AnimalUpdateService
  ) {}

  ngOnInit(): void {
    this.editWeightForm = this.fb.group({
      weightSelect: this.fb.control([], Validators.required),
      weight: this.fb.control([], {
        validators: [
          Validators.required,
          Validators.min(10),
          Validators.max(1000),
        ],
        updateOn: 'blur',
      }),
      date: this.fb.control([], [Validators.required, dateValidator()]),
      weightType: this.fb.control([], Validators.required),
    });

    this.weightSelect.setValue('');

    this.trackWeightSelectChanges();
  }

  ngAfterViewInit() {
    const weightModal = this.modalService.get(Modals.Weight);
    weightModal.onCloseFinished.subscribe(() => {
      weightModal.removeData();
      this.clearForm();
      this.selectedWeight = null;
    });

    weightModal.onOpenFinished.subscribe(() => {
      if (this.isAddMode) {
        this.weightSelect.disable();
      } else {
        this.weightSelect.enable();
      }
    });
  }

  public getCSSClassForDate() {
    if (this.date.invalid && this.date.dirty) {
      return 'is-invalid';
    } else if (this.date.valid && this.date.dirty) {
      return 'is-valid';
    }
  }

  closeModal() {
    this.modalService.get(Modals.Weight).close();
  }

  saveChanges() {
    this.editWeightForm.markAllAsTouched();
    if (this.isAddMode) {
      if (this.editWeightForm.valid && !this.weightDateExists()) {
        this.loadingService.setLoadingState(true);
        const weight: AnimalWeight = {
          weight: this.weight.value,
          weightDate: this.date.value,
          weightType: this.getWeightType(),
        };
        this.updateService
          .addAnimalWeight(this.animal.tagNumber, weight)
          .then(() => {
            this.loadingService.setLoadingState(false);
            this.clearForm();
            this.handleSuccessPopover();
          });
      } else {
        this.weight.markAsDirty();
        this.date.markAsDirty();
        this.weightType.markAsDirty();
      }
    } else {
      if (this.editWeightForm.valid && this.valuesEdited()) {
        this.loadingService.setLoadingState(true);
        const weightUpdate = {
          weight: this.weight.value,
          date: this.date.value,
          ...this.getWeightType(),
        };

        this.updateService
          .updateAnimalWeight(
            this.selectedWeight.id,
            weightUpdate,
            this.animal,
            this.getSelectedIndex()
          )
          .then(() => {
            this.loadingService.setLoadingState(false);
            this.handleSuccessPopover();
            this.editWeightForm.get(FormControls.WeightSelect).setValue('');
            this.selectedWeight = null;
          });
      } else {
        this.weightSelect.markAsDirty();
        this.weight.markAsDirty();
        this.date.markAsDirty();
        this.weightType.markAsDirty();
      }
    }
  }

  private weightDateExists(): boolean {
    const weightDate = Moment(this.date.value);
    return (
      this.animal.weightData.findIndex((weight) => {
        return weight.weightDate.format('L') === weightDate.format('L');
      }) !== -1
    );
  }

  private handleSuccessPopover() {
    this.popover.open();
    timer(3000).subscribe(() => {
      this.popover.close();
    });
  }

  private getWeightType(): AnimalWeightType {
    let output: AnimalWeightType = {
      isSale: false,
      isInitial: false,
    };
    
    switch (this.weightType.value) {
      case RadioValues.Initial:
        output.isInitial = true;
        break;
      case RadioValues.Sale:
        output.isSale = true;
        break;
      default:
        break;
    }
    return output;
  }

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
    this.weightType.markAsPristine();
  }

  private getSelectedIndex(): number {
    return this.animal.weightData.findIndex(
      (weight) => weight?.id === this.selectedWeight.id
    );
  }

  private valuesEdited(): boolean {
    const initialDate = this.selectedWeight.weightDate.format('YYYY-MM-DD');
    const weightTypeInput = this.getWeightType();

    return (
      this.selectedWeight.weight !== this.weight.value ||
      initialDate !== this.date.value ||
      this.selectedWeight.weightType !== weightTypeInput
    );
  }

  private updateForm() {
    this.editWeightForm.controls[FormControls.Weight].setValue(
      this.selectedWeight.weight
    );
    this.editWeightForm.controls[FormControls.Date].setValue(
      this.selectedWeight.weightDate.format('YYYY-MM-DD')
    );
    this.editWeightForm.controls[FormControls.WeightType].setValue(
      this.selectedWeight.weightType.isInitial
        ? RadioValues.Initial
        : this.selectedWeight.weightType.isSale
        ? RadioValues.Sale
        : RadioValues.Intermediate
    );
  }

  private clearForm() {
    this.editWeightForm.reset(
      { weight: '', date: '', weightSelect: '', weightType: '' },
      { emitEvent: false }
    );
  }

  get weight() {
    return this.editWeightForm.get(FormControls.Weight);
  }

  get date() {
    return this.editWeightForm.get(FormControls.Date);
  }

  get weightType() {
    return this.editWeightForm.get(FormControls.WeightType);
  }

  get weightSelect() {
    return this.editWeightForm.get(FormControls.WeightSelect);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
