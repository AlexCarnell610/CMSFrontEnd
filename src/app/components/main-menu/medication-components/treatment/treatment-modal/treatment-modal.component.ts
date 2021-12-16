import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Modals } from '@cms-enums';
import { Medication } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectMedicationById } from '@cms-ngrx/medication';
import { select, Store } from '@ngrx/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';
import { MedicationFormControls } from '../treatment.component';

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
    private readonly modalService: NgxSmartModalService
  ) {}

  ngOnInit(): void {
    this.parentForm
      .get(MedicationFormControls.Medication)
      .valueChanges.subscribe((val) => {
        console.error(val);
      });
  }

  ngAfterViewInit(): void {
    this.trackModalOpen();
  }

  private trackModalOpen() {
    this.modalService.get(Modals.Treatment).onOpen.subscribe(() => {
      const medicationId = this.medicationControl.value;
      this.selectedMedication$ = this.store.pipe(
        select(selectMedicationById, { id: medicationId })
      );
    });
  }

  private get medicationControl(): AbstractControl {
    return this.parentForm.get(MedicationFormControls.Medication);
  }
}
