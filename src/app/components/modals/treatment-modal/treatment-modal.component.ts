import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Modals } from '@cms-enums';
import { Medication, Treatment } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getTagsForSelect } from '@cms-ngrx/animal';
import { selectMedicationById } from '@cms-ngrx/medication';
import {
  LoadingPaneService,
  TreatmentUpdateService,
  WarningService,
} from '@cms-services';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { getUniqueGroups } from 'libs/ngrx/src/lib/treatmentState/treatment.selectors';
import * as moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { combineLatest, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedicationFormControls } from '../../main-menu/medication-components/treatment/treatment.component';

interface TreatmentGroup {
  value: string;
  group: string;
}
@Component({
  selector: 'cms-treatment-modal',
  templateUrl: './treatment-modal.component.html',
  styleUrls: ['./treatment-modal.component.css'],
})
export class TreatmentModalComponent implements OnInit, AfterViewInit {
  @Input() parentForm: FormGroup;
  @ViewChild('popover') popover: NgbPopover;

  public treatmentGroups$: Observable<TreatmentGroup[]>;
  public selectedMedication$: Observable<Medication>;
  public openSelect = false;

  constructor(
    private readonly store: Store<RootState>,
    private readonly modalService: NgxSmartModalService,
    private readonly warningService: WarningService,
    private readonly loadingService: LoadingPaneService,
    private readonly treatmentHttpService: TreatmentUpdateService
  ) {}

  ngOnInit(): void {
    this.getTreatmentGroups();
  }

  ngAfterViewInit(): void {
    this.trackModalOpen();
  }

  private getTreatmentGroups() {
    this.treatmentGroups$ = combineLatest([
      this.store.select(getTagsForSelect()),
      this.store.select(getUniqueGroups()),
    ]).pipe(
      map(([tags, groups]) => {
        return tags.concat(groups);
      })
    );
  }

  private trackModalOpen() {
    this.modalService.get(Modals.Treatment).onOpen.subscribe(() => {
      const medicationId = this.medicationControl.value;
      this.selectedMedication$ = this.store.pipe(
        select(selectMedicationById(medicationId))
      );
    });
  }

  public ngSelectClick(event) {
    const classList = (event.target as HTMLElement).classList;

    if (
      !(
        classList.contains('ng-option') ||
        classList.contains('ng-option-label') ||
        classList.contains('ng-optgroup')
      )
    ) {
      this.openSelect = !this.openSelect;
    }
  }

  public divClicked(event) {
    const target = event.target as HTMLElement;

    if (!(target.tagName === 'INPUT' && target.classList.length == 0)) {
      this.openSelect = false;
    }
  }

  public getCSSForTrtmntGroup() {
    if (
      this.treatmentGroupControl.invalid &&
      this.treatmentGroupControl.dirty
    ) {
      return 'ng-invalid ng-touched';
    } else if (
      this.treatmentGroupControl.valid &&
      this.treatmentGroupControl.dirty
    ) {
      return 'is-valid was-validated';
    }
  }

  public getCSSForDate() {
    if (this.dateControl.invalid && this.dateControl.dirty) {
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
    this.markAllDirty();
    if (this.parentForm.valid) {
      let newTreatment: Treatment = {
        date: this.dateControl.value,
        dose: this.doseControl.value,
        medicationID: this.medicationControl.value,
        treatmentGroup: this.treatmentGroupControl.value.join(', '),
      };

      if (moment(newTreatment.date).isBefore(moment().subtract(1, 'week'))) {
        this.warningService
          .show({
            header: 'Treatment is more than a week ago',
            body: 'Are you sure you want to continue?',
            buttonText: 'Continue',
          })
          .subscribe((res) => {
            if (res) {
              this.saveTreatment(newTreatment);
            }
          });
      } else {
        this.saveTreatment(newTreatment);
      }
    }
  }

  private saveTreatment(treatment: Treatment): void {
    this.loadingService.setLoadingState(true);
    this.treatmentHttpService
      .addTreatment(treatment)
      .then(() => {
        this.loadingService.setLoadingState(false);
        this.handlePopover('Treatment Saved', true, 1000);
      })
      .catch(() => {
        this.loadingService.setLoadingState(false);
        this.handlePopover('Error has occured', false, 1000);
      });
  }

  private markAllDirty(): void {
    this.dateControl.markAsDirty();
    this.doseControl.markAsDirty();
    this.treatmentGroupControl.markAsDirty();
  }

  private handlePopover(message: string, success: boolean, time: number): void {
    this.popover.popoverClass = this.getCSSForPopover(success);
    this.popover.ngbPopover = message;
    this.popover.open();

    timer(time).subscribe(() => {
      this.popover.close();
      if (success) this.closeModal();
    });
  }

  private closeModal() {
    this.modalService.get(Modals.Treatment).close();
  }

  private getCSSForPopover(success: boolean) {
    return success ? 'update-success' : 'update-error';
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
