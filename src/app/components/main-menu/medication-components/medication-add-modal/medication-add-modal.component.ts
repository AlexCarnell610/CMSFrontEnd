import { formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORM_DATE_FORMAT, Modals } from '@cms-enums';
import { IMedication } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { Store } from '@ngrx/store';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import {
  addMedication,
  updateMedication,
} from 'libs/ngrx/src/lib/medicationState';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-medication-add-modal',
  templateUrl: './medication-add-modal.component.html',
  styleUrls: ['./medication-add-modal.component.scss'],
})
export class MedicationAddModalComponent implements OnInit, AfterViewInit {
  modalIdentifier = Modals.MedicationAddModal;
  isEdit = false;
  medicationToEdit: IMedication = null;
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  mediaStreamLoaded = false;
  mediaStream: MediaStream;
  allowedFormats = [
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.DATA_MATRIX,
  ];
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
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scanner.scanStop();
    const modal = this.modalService.get(this.modalIdentifier);
    this.subs
      .add(
        modal.onOpen.subscribe(() => {
          // not working first time
          this.isEdit = modal.getData().isEdit;

          if (this.isEdit) {
            this.medicationToEdit = modal.getData().medicationToEdit;
            this.medicationForm.patchValue({
              batchNumber: this.medicationToEdit.batchNumber,
              expiryDate: this.medicationToEdit.expiryDate.format(FORM_DATE_FORMAT),
              medicationName: this.medicationToEdit.name,
              withdrawalPeriod: this.medicationToEdit.withdrawalPeriod,
            });
          }
          this.scanner.restart();
          this.scanner.enable = true;
          this.scanner.askForPermission().then((permission) => {
            if (permission) {
              this.scanner.updateVideoInputDevices().then((devices) => {
                this.scanner.device = devices[0];
              });
            }
          });
        })
      )
      .add(
        modal.onAnyCloseEvent.subscribe(() => {
          this.scanner.enable = false;
<<<<<<< HEAD
          this.scanner.scanStop()
=======
>>>>>>> origin
          modal.removeData();
        })
      );
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

  close(): void {
<<<<<<< HEAD
    this.scanner.scanStop()
=======
>>>>>>> origin
    this.modalService.get(this.modalIdentifier).close();
  }
  scanned(out): void {
    // console.warn("scanned", out)
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
