import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { IMedication, ITreatment, MedDisplayDataType } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectMedications2 } from '@cms-ngrx/medication';
import { selectTreatments } from '@cms-ngrx/treatment';
import { Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'cms-medication',
    templateUrl: './medication.component.html',
    styleUrls: ['./medication.component.scss'],
    standalone: false
})
export class MedicationComponent implements OnInit, OnDestroy {
  medications$: Observable<IMedication[]>;
  treatments$: Observable<ITreatment[]>;
  isEditMedication = false;
  medicationToEdit: IMedication = null;
  treatmentDateFilter = new FormControl();
  filteredTreatments$: BehaviorSubject<ITreatment[]> = new BehaviorSubject([]);
  private subs: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private modalService: NgxSmartModalService,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.medications$ = this.store.select(selectMedications2());
    this.treatments$ = this.store.select(selectTreatments);

    this.listenToTreatmentTableFilter();
  }

  listenToTreatmentTableFilter(): void {
    const treatmentsOrderedByTreatmentDate = this.treatments$.pipe(
      map((treatments) =>
        treatments.sort((trtA, trtB) =>
          trtA.treatmentStartDate.diff(trtB.treatmentStartDate, 'days').days <= 1 ? 1 : -1
        )
      )
    );
    this.subs.add(
      combineLatest([
        this.treatmentDateFilter.valueChanges.pipe(
          startWith(''),
          map((value) => DateTime.fromFormat(value, 'YYYY-MM-dd'))
        ),
        treatmentsOrderedByTreatmentDate,
      ]).subscribe(([date, treatments]) => {
        if (date.toMillis() > DateTime.fromFormat('1900-01-01', 'YYYY-MM-dd').toMillis()) {
          this.filteredTreatments$.next(
            treatments.filter((treatment) =>
              treatment.treatmentStartDate.diff(date, 'days').days >= 1
            )
          );
        } else {
          this.filteredTreatments$.next(treatments);
        }
      })
    );
  }

  clearFilter(): void {
    this.treatmentDateFilter.setValue(null);
  }

  backToMain(): void {
    this.router.navigate([PageURLs.MainMenu]);
  }

  addMedication(): void {
    this.medicationModal.setData({ isEdit: false, medicationToEdit: null });
    this.medicationModal.open();
  }

  editMedication(datum: MedDisplayDataType): void {
    this.medicationModal.setData({
      isEdit: true,
      medicationToEdit: datum.toInitialType(),
    });
    this.medicationModal.open();
  }

  editTreatment(datum: MedDisplayDataType): void {
    this.treatmentModal.setData({
      isEdit: true,
      treatmentToEdit: datum.toInitialType(),
    });
    this.treatmentModal.open();
  }

  addTreatment(): void {
    this.treatmentModal.setData({ isEdit: false, treatmentToEdit: null });
    this.treatmentModal.open();
  }

  print(): void {
    const tableToPrint = document.getElementById('printTable');
    var printWindow = window.open('');
    printWindow.document.write(tableToPrint.outerHTML);
    printWindow.print();
    printWindow.close();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private get medicationModal(): NgxSmartModalComponent {
    return this.modalService.get(Modals.MedicationAddModal);
  }

  private get treatmentModal(): NgxSmartModalComponent {
    return this.modalService.get(Modals.TreatmentModal);
  }
}
