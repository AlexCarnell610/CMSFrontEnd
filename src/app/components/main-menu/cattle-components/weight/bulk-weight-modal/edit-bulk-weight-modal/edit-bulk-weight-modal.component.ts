import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modals } from '@cms-enums';
import { IBulkWeight } from '@cms-interfaces';
import { dateValidator } from '@cms-validators';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-edit-bulk-weight-modal',
  templateUrl: './edit-bulk-weight-modal.component.html',
  styleUrls: ['./edit-bulk-weight-modal.component.scss'],
})
export class EditBulkWeightModalComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() weight: IBulkWeight = null;
  @Output() weightChange: EventEmitter<IBulkWeight> =
    new EventEmitter<IBulkWeight>();
  openFinishedSub = new Subscription();
  modalIdentifier = Modals.EditBulkWeightModal;

  editBulkWeightForm = new FormGroup<{
    weight: FormControl<string>;
    date: FormControl<string>;
    tagNumber: FormControl<string>;
  }>({
    weight: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.min(10),
        Validators.max(1000),
      ],
      updateOn: 'blur',
    }),
    date: new FormControl(null, [Validators.required, dateValidator()]),
    tagNumber: new FormControl(null, {
      validators: [
        Validators.pattern(/^UK\d{12}$|^\d{3}$|^\d{6}$/),
        Validators.required,
      ],
      updateOn: 'blur',
    }),
  });

  constructor(private readonly modalService: NgxSmartModalService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const modal = this.modalService.get(Modals.EditBulkWeightModal);
    this.openFinishedSub.add(
      modal.onOpenFinished.subscribe(() => {
        this.editBulkWeightForm.patchValue({
          date: formatDate(this.weight.date, 'yyyy-MM-dd', 'en-EN'),
          tagNumber: this.weight.tagNumber,
          weight: this.weight.weight,
        });
      })
    );
  }

  getCSSClassForDate() {
    if (this.dateControl.invalid && this.dateControl.dirty) {
      return 'is-invalid';
    } else if (this.dateControl.valid && this.dateControl.dirty) {
      return 'is-valid';
    }
  }

  save(): void {
    console.warn(this.editBulkWeightForm.errors);
    if (this.editBulkWeightForm.valid) {
      this.weightChange.emit({
        ...this.weight,
        ...this.editBulkWeightForm.value,
        date: new Date(this.dateControl.value),
      });
      this.close();
    }
  }

  close(): void {
    this.modalService.get(Modals.EditBulkWeightModal).close();
  }

  get weightControl(): FormControl {
    return this.editBulkWeightForm.controls.weight;
  }
  get dateControl(): FormControl {
    return this.editBulkWeightForm.controls.date;
  }

  get tagNumberControl(): FormControl {
    return this.editBulkWeightForm.controls.tagNumber;
  }

  ngOnDestroy(): void {
    this.openFinishedSub.unsubscribe();
  }
}
