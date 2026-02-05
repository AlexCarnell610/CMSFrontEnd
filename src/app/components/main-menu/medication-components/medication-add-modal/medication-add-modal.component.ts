import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORM_DATE_FORMAT, Modals } from '@cms-enums';
import { IMedication } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { addMedication, updateMedication } from '@cms-ngrx/medication';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription, timer } from 'rxjs';
import { MedicationActionTypes } from '@cms-ngrx/medication';

@Component({
    selector: 'cms-medication-add-modal',
    templateUrl: './medication-add-modal.component.html',
    styleUrls: ['./medication-add-modal.component.scss'],
    standalone: false
})
export class MedicationAddModalComponent implements OnInit, AfterViewInit {
  modalIdentifier = Modals.MedicationAddModal;
  isEdit = false;
  medicationToEdit: IMedication = null;
  @ViewChild('saveConfirm') saveConfirm: NgbPopover;
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  mediaStreamLoaded = false;
  mediaStream: MediaStream;
  allowedFormats = [BarcodeFormat.DATA_MATRIX];
  showScanner = true;
  medicationForm = new FormGroup<{
    medicationName: FormControl<string>;
    batchNumber: FormControl<string>;
    expiryDate: FormControl<string>;
    withdrawalPeriod: FormControl<number>;
  }>({
    medicationName: new FormControl(null, Validators.required),
    batchNumber: new FormControl(null, Validators.required),
    expiryDate: new FormControl(null, Validators.required),
    withdrawalPeriod: new FormControl(null, Validators.required),
  });

  private readonly subs = new Subscription();
  constructor(
    private readonly modalService: NgxSmartModalService,
    private readonly store: Store<RootState>,
    private readonly actions: Actions
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scanner.scanStop();
    const modal = this.modalService.get(this.modalIdentifier);
    this.subs.add(
      modal.onAnyCloseEventFinished.subscribe(() => {
        this.medicationForm.reset();
      })
    );
    this.subs
      .add(
        modal.onOpen.subscribe(() => {
          // not working first time
          this.isEdit = (modal.getData() as any).isEdit;

          if (this.isEdit) {
            this.medicationToEdit = (modal.getData() as any).medicationToEdit;
            this.medicationForm.patchValue({
              batchNumber: this.medicationToEdit.batchNumber,
              expiryDate:
                this.medicationToEdit.expiryDate.format(FORM_DATE_FORMAT),
              medicationName: this.medicationToEdit.name,
              withdrawalPeriod: this.medicationToEdit.withdrawalPeriod,
            });
          }
          this.restartScanner();
        })
      )
      .add(
        modal.onAnyCloseEvent.subscribe(() => {
          this.scanner.enable = false;
          this.scanner.scanStop();
          modal.removeData();
        })
      )
      .add(modal.onOpenFinished.subscribe(() => {}));
  }

  restartScanner(): void {
    this.scanner.restart();
    this.scanner.enable = true;

    this.scanner.askForPermission().then((permission) => {
      if (permission) {
        this.scanner.updateVideoInputDevices().then((devices) => {
          this.scanner.device =
            devices.find((device) => device.label.includes('facing back')) ||
            devices[0];
        });
      }
    });
  }

  openCamera(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.mediaStreamLoaded = true;
        this.mediaStream = stream;
      });
  }

  codeFound(code: string): void {
    const day = code.slice(23, 25);
    const month = code.slice(21, 23);
    const year = 20 + code.slice(19, 21);
    const expiryDate = new Date(+year, +month - 1, +day);
    const batchNum = code.slice(27);

    this.medicationForm.patchValue({
      expiryDate: formatDate(expiryDate, 'yyyy-MM-dd', 'en-EN'),
      batchNumber: batchNum,
    });
    this.scanner.scanStop();
  }

  save(): void {
    if (this.medicationForm.valid) {
      const batchNumber = this.batchNumberControl.value;
      const name = this.medicationNameControl.value;
      const expiryDate = this.expiryDateControl.value;
      const withdrawalPeriod = this.withdrawalPeriodControl.value;

      if (!this.isEdit) {
        this.subs.add(
          this.actions
            .pipe(ofType(MedicationActionTypes.LoadMedicationSuccess))
            .subscribe(() => {
              this.handlePopover();
            })
        );
        this.store.dispatch(
          addMedication({
            medication: {
              batchNumber,
              expiryDate,
              name,
              withdrawalPeriod,
            },
          })
        );
      } else {
        this.subs.add(
          this.actions
            .pipe(ofType(MedicationActionTypes.UpdateMedicationSuccess))
            .subscribe(() => {
              this.handlePopover();
            })
        );
        this.store.dispatch(
          updateMedication({
            medication: {
              changes: { batchNumber, expiryDate, name, withdrawalPeriod },
              id: this.medicationToEdit.id,
            },
          })
        );
      }
    }
  }

  private handlePopover() {
    this.saveConfirm.open();
    this.subs.add(
      timer(1500).subscribe(() => {
        this.saveConfirm.close();
        this.clear()
      })
    );
  }

  toggleCamera(): void {
    if (this.showScanner) {
      this.scanner.scanStop();
      this.showScanner = false;
    } else {
      this.showScanner = true;
      setTimeout(() => {
        this.restartScanner();
      }, 300);
    }
  }

  close(): void {
    this.scanner.scanStop();
    this.modalService.get(this.modalIdentifier).close();
  }

  clear(): void {
    this.medicationForm.reset();
    this.scanner.scanStart();
    this.scanner.enable = true;
  }
  scanned(out): void {
    // console.warn('scanned', out);
  }

  get medicationNameControl(): FormControl {
    return this.medicationForm.controls.medicationName;
  }

  get batchNumberControl(): FormControl {
    return this.medicationForm.controls.batchNumber;
  }

  get expiryDateControl(): FormControl {
    return this.medicationForm.controls.expiryDate;
  }

  get withdrawalPeriodControl(): FormControl {
    return this.medicationForm.controls.withdrawalPeriod;
  }
}
