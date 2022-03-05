import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Modals } from '@cms-enums';
import { Medication, Treatment } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getTagsForSelect } from '@cms-ngrx/animal';
import { selectMedicationById } from '@cms-ngrx/medication';
import { HttpService } from '@cms-services/http';
import { select, Store } from '@ngrx/store';
import { getUniqueGroups } from 'libs/ngrx/src/lib/treatmentState/treatment.selectors';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { combineLatest, Observable } from 'rxjs';
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

  public treatmentGroups$: Observable<TreatmentGroup[]>;
  public selectedMedication$: Observable<Medication>;
  public openSelect = false;

  constructor(
    private readonly store: Store<RootState>,
    private readonly modalService: NgxSmartModalService,
    private readonly httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.getTreatmentGroups();
    this.parentForm
      .get(MedicationFormControls.TreatmentGroup)
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
    this.dateControl.markAsDirty();
    this.doseControl.markAsDirty();
    this.treatmentGroupControl.markAsDirty();
    console.warn(this.treatmentGroupControl.value);
    let newTreatment: Treatment = {
      date: this.dateControl.value,
      dose: this.doseControl.value,
      medicationID: this.medicationControl.value,
      treatmentGroup: this.treatmentGroupControl.value,
    };

    // this.httpService.addTreatment(newTreatment).subscribe(
    //   (res) => {
    //     console.warn('RESPONSE', res);
    //   },
    //   (err) => {
    //     console.error('Error', err);
    //   }
    // );
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
