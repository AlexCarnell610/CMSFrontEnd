import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORM_DATE_FORMAT, Modals } from '@cms-enums';
import { IMedication, ITreatment } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import {
  selectInDateMedications,
  selectOutOfDateMedications,
} from '@cms-ngrx/medication';
import { addTreatment, updateTreatment } from '@cms-ngrx/treatment';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable, Subscription, combineLatest, merge } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'cms-treatment-modal',
  templateUrl: './treatment-modal.component.html',
  styleUrls: ['./treatment-modal.component.scss'],
})
export class TreatmentModalComponent implements OnInit, AfterViewInit {
  inDateMedications$: Observable<IMedication[]>;
  outOfDateMedications$: Observable<IMedication[]>;

  medications$: Observable<IMedication[]>;
  modalIdentifier = Modals.TreatmentModal;
  isEdit = false;

  private treatmentToEdit: ITreatment;
  private subs: Subscription = new Subscription();
  treatmentForm = new FormGroup<{
    treatmentGroup: FormControl<string>;
    medication: FormControl<IMedication>;
    administerer: FormControl<string>;
    treatmentDate: FormControl<string>;
  }>({
    administerer: new FormControl(null, Validators.required),
    treatmentDate: new FormControl(null, Validators.required),
    medication: new FormControl(null, Validators.required),
    treatmentGroup: new FormControl(null, Validators.required),
  });

  constructor(
    private readonly modalService: NgxSmartModalService,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.inDateMedications$ = this.store.select(selectInDateMedications);
    this.outOfDateMedications$ = this.store.select(selectOutOfDateMedications);

    this.medications$ = combineLatest([
      this.inDateMedications$,
      this.outOfDateMedications$,
    ]).pipe(map(([inDateMeds, expiredMeds]) => inDateMeds.concat(expiredMeds)));
  }

  ngAfterViewInit(): void {
    const modal = this.modalService.get(this.modalIdentifier);

    this.subs
      .add(
        modal.onOpen
          .pipe(withLatestFrom(this.medications$))
          .subscribe(([_, medications]) => {
            this.isEdit = modal.getData().isEdit;
            if (this.isEdit) {
              this.treatmentToEdit = modal.getData().treatmentToEdit;

              this.treatmentForm.patchValue({
                administerer: this.treatmentToEdit.administerer,
                medication: medications.find(
                  (medication) =>
                    medication.id === this.treatmentToEdit.medication
                ),
                treatmentDate:
                  this.treatmentToEdit.treatmentDate.format(FORM_DATE_FORMAT),
                treatmentGroup: this.treatmentToEdit.treatmentGroup,
              });
            }
          })
      )
      .add(modal.onAnyCloseEvent.subscribe(() => modal.removeData()));
  }

  save(): void {
    this.treatmentForm.markAllAsTouched();
    this.treatmentGroupControl.markAsDirty();
    this.administererControl.markAsDirty();
    this.dateControl.markAsDirty();
    this.medicationControl.markAsDirty();
    if (this.treatmentForm.valid) {
      if (!this.isEdit) {
        this.store.dispatch(
          addTreatment({
            treatment: {
              ...this.treatmentForm.getRawValue(),
              treatmentDate: this.dateControl.value,
              medication: this.medicationControl.value.id,
            },
          })
        );
      } else {
        this.store.dispatch(
          updateTreatment({
            treatment: {
              id: this.treatmentToEdit.id,
              changes: {
                ...this.treatmentForm.getRawValue(),
                treatmentDate: this.dateControl.value,
                medication: this.medicationControl.value.id,
              },
            },
          })
        );
      }
    }
  }

  close(): void {
    this.modalService.get(this.modalIdentifier).close();
  }

  get administererControl(): FormControl {
    return this.treatmentForm.controls.administerer;
  }

  get dateControl(): FormControl {
    return this.treatmentForm.controls.treatmentDate;
  }

  get medicationControl(): FormControl<IMedication> {
    return this.treatmentForm.controls.medication;
  }

  get treatmentGroupControl(): FormControl {
    return this.treatmentForm.controls.treatmentGroup;
  }
}
