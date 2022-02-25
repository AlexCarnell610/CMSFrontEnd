import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Modals } from '@cms-enums';
import { Medication, Treatment } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectMedicationById } from '@cms-ngrx/medication';
import { HttpService } from '@cms-services/http';
import { select, Store } from '@ngrx/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';
import { MedicationFormControls } from '../../main-menu/medication-components/treatment/treatment.component';

@Component({
  selector: 'cms-treatment-modal',
  templateUrl: './treatment-modal.component.html',
  styleUrls: ['./treatment-modal.component.css'],
})
export class TreatmentModalComponent implements OnInit, AfterViewInit {
  @Input() parentForm: FormGroup;
  public selectedMedication$: Observable<Medication>;

  constructor(
    private readonly store: Store<RootState>,
    private readonly modalService: NgxSmartModalService,
    private readonly httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.parentForm
      .get(MedicationFormControls.Medication)
      .valueChanges.subscribe((val) => {
        console.error(val);
      });

    this.dateControl.valueChanges.subscribe((val) => {
      console.warn(val);
      console.warn(this.dateControl.errors);
    });
  }

  ngAfterViewInit(): void {
    this.trackModalOpen();
  }

  private trackModalOpen() {
    this.modalService.get(Modals.Treatment).onOpen.subscribe(() => {
      const medicationId = this.medicationControl.value;
      this.selectedMedication$ = this.store.pipe(
        select(selectMedicationById(medicationId))
      );
    });
  }

  public getCSSForDate() {
    if (this.dateControl.invalid && this.dateControl.dirty) {
      console.warn('CALLED', this.dateControl.invalid, this.dateControl.dirty);
      return 'is-invalid';
    } else if (this.dateControl.valid && this.dateControl.dirty) {
      return 'is-valid';
    }
  }

  public getCSSForDose() {
    if (this.doseControl.invalid && this.doseControl.dirty) {
      return 'is-invalid was-validated';
    } else if (this.doseControl.valid && this.doseControl.dirty) {
      return 'is-valid was-validated';
    }
  }

  public save() {
    this.dateControl.markAsDirty();
    this.doseControl.markAsDirty();
    this.treatmentGroupControl.markAsDirty();
    console.warn(this.doseControl.errors);
    let newTreatment: Treatment = {
      date: this.dateControl.value,
      dose: this.doseControl.value,
      medicationID: this.medicationControl.value,
      treatmentGroup: this.treatmentGroupControl.value,
    };

    this.httpService.addTreatment(newTreatment).subscribe(
      (res) => {
        console.warn('RESPONSE', res);
      },
      (err) => {
        console.error('Error', err);
      }
    );
  }

  private get medicationControl(): AbstractControl {
    return this.parentForm.get(MedicationFormControls.Medication);
  }

  public get treatmentGroupControl(): AbstractControl {
    return this.parentForm.get(MedicationFormControls.TreatmentGroup);
  }

  public get doseControl(): AbstractControl {
    return this.parentForm.get(MedicationFormControls.Dose);
  }

  public get dateControl(): AbstractControl {
    return this.parentForm.get(MedicationFormControls.Date);
  }
}
