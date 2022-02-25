import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Medication } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { treatmentDateValidator } from '@cms-validators';
import { select, Store } from '@ngrx/store';
import { selectInDateMedications } from 'libs/ngrx/src/lib/medicationState';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';

export enum MedicationFormControls {
  Medication = 'medication',
  TreatmentGroup = 'treatmentGroup',
  Dose = 'dose',
  Date = 'date',
}

@Component({
  selector: 'cms-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css'],
})
export class TreatmentComponent implements OnInit {
  public form: FormGroup;
  public medications$: Observable<Medication[]>;

  constructor(
    private readonly router: Router,
    private readonly _fb: FormBuilder,
    private readonly store: Store<RootState>,
    private readonly modalService: NgxSmartModalService
  ) {}

  ngOnInit(): void {
    this.setUpForm();
    this.medications$ = this.store.pipe(select(selectInDateMedications));
  }

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  private setUpForm() {
    this.form = this._fb.group({
      medication: this._fb.control([], Validators.required),
      treatmentGroup: this._fb.control([], Validators.required),
      dose: this._fb.control([], Validators.required),
      date: this._fb.control(
        [],
        Validators.compose([Validators.required, treatmentDateValidator()])
      ),
    });
  }

  public get medication() {
    return this.form.get(MedicationFormControls.Medication);
  }

  public openTreatmentModal() {
    this.medication.markAsDirty();
    if (this.medication.valid) {
      this.modalService.get(Modals.Treatment).open();
    }
  }

  public viewTreatments() {
    console.log('Go To Treatments');
  }
}
