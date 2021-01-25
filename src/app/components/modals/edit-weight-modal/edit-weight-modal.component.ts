import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modals } from '@cms-enums';
import { Animal, AnimalWeight, AnimalWeightType } from '@cms-interfaces';
import { RootState } from '@cms-ngrx/reducers';
import { HttpService } from '@cms-services/http';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { UpdateAnimalWeight } from 'libs/ngrx/src/lib/actions/src/animal.actions';
import { LoadingPaneService } from 'libs/services/services/src/loading-pane.service';
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
  // @ViewChild('updateSuccess', {static: false}) updateSuccMessage: NgbAlert;
  private subs: Subscription = new Subscription();
  public editWeightForm: FormGroup = new FormGroup({});
  private selectedWeight: AnimalWeight = null;
  public showSuccess = false;

  constructor(
    private readonly modalService: NgxSmartModalService,
    private store: Store<RootState>,
    private fb: FormBuilder,
    private httpService: HttpService,
    private loadingService: LoadingPaneService
  ) {}

  ngOnInit(): void {
    this.editWeightForm = this.fb.group({
      weightSelect: this.fb.control([]),
      weight: this.fb.control([]),
      date: this.fb.control([]),
      weightType: this.fb.control([]),
      // isSale: this.fb.control([false]),
      // isInitial: this.fb.control([false]),
      // isIntermediate: this.fb.control([false])
    });

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
    this.showSuccess = !this.showSuccess;
    if (this.selectedWeight && this.valuesEdited()) {
      this.loadingService.setLoadingState(true);

      const weightUpdate = {
        weight: this.editWeightForm.controls[FormControls.Weight].value,
        date: this.editWeightForm.controls[FormControls.Date].value,
        ...this.getWeightType()
      };
      this.httpService
        .updateWeight(Number.parseInt(this.selectedWeight.id), weightUpdate)
        .subscribe((res) => {
          this.popover.open();
          console.warn(res);
          // console.warn(this.animal);
          let index = this.getSelectedIndex();
          let update = this.animal.weightData.slice();

          update.splice(index, 1, res);

          // console.info(update);

          this.store.dispatch(
            new UpdateAnimalWeight({
              weightUpdate: {
                id: this.animal.tagNumber,
                changes: {
                  weightData: update,
                },
              },
            })
          );
          this.editWeightForm
            .get(FormControls.WeightSelect)
            .setValue('invalid');
            this.selectedWeight = null;
          this.showSuccess = true;
          timer(3000).subscribe(() => {
            // console.warn('CLOSE NOW PLS');
            // this.updateSuccMessage.close()
            this.popover.close();
          });
          this.loadingService.setLoadingState(false);
        });
    }
  }

  private getWeightType() : AnimalWeightType{
    const weightType = this.editWeightForm.get(FormControls.WeightType).value;
    let output: AnimalWeightType = {
      isSale: false,
      isInitial: false
    }
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
    const weightTypeInput = this.getWeightType()

    return (
      this.selectedWeight.weight !== weightInput.value ||
      initialDate !== dateInput.value || this.selectedWeight.weightType !== weightTypeInput
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
    this.editWeightForm.reset({weight: '', date: '', weightSelect: 'invalid', weightType: ''}, {emitEvent: false});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
