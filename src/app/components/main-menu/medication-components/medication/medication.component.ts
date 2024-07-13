import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { IMedication, MedDisplayDataType } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectMedications } from '@cms-ngrx/medication';
import { LoadingPaneService } from '@cms-services';
import { Store } from '@ngrx/store';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cms-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss'],
})
export class MedicationComponent implements OnInit, OnDestroy {
  medications$: Observable<IMedication[]>;
  isEditMedication = false;
  medicationToEdit: IMedication = null;
  private subs: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private modalService: NgxSmartModalService,
    private readonly loadingService: LoadingPaneService,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.medications$ = this.store.select(selectMedications);
  }

  backToMain(): void {
    this.router.navigate([PageURLs.MainMenu]);
  }

  addMedication(): void {
    this.modal.setData({ isEdit: false, medicationToEdit: null });
    this.modal.open();
  }

  edit(datum: MedDisplayDataType): void {
    console.warn("data",datum.toInitialType());
    this.modal.setData({
      isEdit: true,
      medicationToEdit: datum.toInitialType(),
    });
    this.modal.open();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private get modal(): NgxSmartModalComponent {
    return this.modalService.get(Modals.MedicationAddModal);
  }
}
