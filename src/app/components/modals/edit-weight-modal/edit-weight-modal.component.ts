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
import { RootState } from '@cms-ngrx/reducers';
import { HttpService } from '@cms-services/http';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AnimalUpdateService } from 'libs/services/services/animal-update.service';
import { LoadingPaneService } from 'libs/services/services/src/loading-pane.service';
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
  selector: 'cms-edit-weight-modal',
  templateUrl: './edit-weight-modal.component.html',
  styleUrls: ['./edit-weight-modal.component.css'],
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
      weightSelect: this.fb.control([]),
      weight: this.fb.control([], {validators: [Validators.required, Validators.min(10), Validators.max(1000)], updateOn: 'blur'}),
      date: this.fb.control([], Validators.required),
      weightType: this.fb.control([], Validators.required),
    });
    
    this.weight.valueChanges.subscribe(w => {
      console.warn(this.weight.errors);
      
      console.warn("Condition", !!(this.weight.value && this.weight.errors));
      
    })
    this.date.valueChanges.subscribe(w => {
      console.warn(this.date.errors);
      console.warn(this.date.value);
      
      console.warn(!this.date.valid && this.date.dirty );
      
    })
    this.weightType.valueChanges.subscribe(w => {
      console.warn("type", this.weightType.errors);
      
    })

    this.editWeightForm.get(FormControls.WeightSelect).setValue('invalid');

    this.trackWeightSelectChanges();
    this.editWeightForm
      .get(FormControls.WeightSelect)
      .valueChanges.subscribe((val) => {
        console.warn(val);
      });
  }

  ngAfterViewInit() {
    const weightModal = this.modalService.get(Modals.Weight);
    weightModal.onCloseFinished.subscribe(() => {
      weightModal.removeData();
      this.clearForm();
      this.selectedWeight = null;
    });
  }

  closeModal() {
    this.modalService.get(Modals.Weight).close();
  }

  saveChanges() {
    // console.warn(this.animal.weightData[0].weightDate.format('L'))
    // console.warn("exists",this.weightDateExists());
    if (this.isAddMode) {
      if (this.editWeightForm.valid && !this.weightDateExists()) {
        this.loadingService.setLoadingState(true);
        const weight: AnimalWeight = {
          weight: this.editWeightForm.get(FormControls.Weight).value,
          weightDate: this.editWeightForm.get(FormControls.Date).value,
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
        console.error(this.weight.errors);
        this.weight.markAsDirty();
        this.date.markAsDirty();
        this.weightType.markAsDirty();
      }
    } else {
      if (this.selectedWeight && this.valuesEdited()) {
        this.loadingService.setLoadingState(true);
        const weightUpdate = {
          weight: this.editWeightForm.controls[FormControls.Weight].value,
          date: this.editWeightForm.controls[FormControls.Date].value,
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
            this.editWeightForm
              .get(FormControls.WeightSelect)
              .setValue('invalid');
            this.selectedWeight = null;
          });
      }
    }
  }

  private weightDateExists(): boolean{
    const weightDate = Moment(this.editWeightForm.get(FormControls.Date).value)
    return this.animal.weightData.findIndex(weight => {
      return weight.weightDate.format('L') === weightDate.format('L');
    }) !== -1

  }

  private handleSuccessPopover() {
    this.popover.open();
    timer(3000)
      .subscribe(() => {
        this.popover.close();
      })
  }

  private getWeightType(): AnimalWeightType {
    const weightType = this.editWeightForm.get(FormControls.WeightType).value;
    let output: AnimalWeightType = {
      isSale: false,
      isInitial: false,
    };
    switch (weightType) {
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
    this.editWeightForm
      .get(FormControls.WeightSelect)
      .valueChanges.subscribe((value) => {
        if (value !== 'invalid') {
          this.selectedWeight = this.animal.weightData.find(
            (animalWeight) => animalWeight.id == value
          );
          this.updateForm();
        } else {
          this.clearForm();
        }
      });
  }

  private getSelectedIndex(): number {
    return this.animal.weightData.findIndex(
      (weight) => weight?.id === this.selectedWeight.id
    );
  }

  private valuesEdited(): boolean {
    const weightInput = this.editWeightForm.controls[FormControls.Weight];
    const dateInput = this.editWeightForm.controls[FormControls.Date];
    const initialDate = this.selectedWeight.weightDate.format('YYYY-MM-DD');
    const weightTypeInput = this.getWeightType();

    return (
      this.selectedWeight.weight !== weightInput.value ||
      initialDate !== dateInput.value ||
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
      { weight: '', date: '', weightSelect: 'invalid', weightType: '' },
      { emitEvent: false }
    );
  }

  get weight(){
    return this.editWeightForm.get(FormControls.Weight)
  }

  get date(){
    return this.editWeightForm.get(FormControls.Date)
  }

  get weightType(){
    return this.editWeightForm.get(FormControls.WeightType)
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
