import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modals } from '@cms-enums';
import { IBulkWeight } from '@cms-interfaces';
import { dateValidator } from '@cms-validators';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'cms-edit-bulk-weight-modal',
  templateUrl: './edit-bulk-weight-modal.component.html',
  styleUrls: ['./edit-bulk-weight-modal.component.scss'],
})
export class EditBulkWeightModalComponent implements OnInit, AfterViewInit {
  @Input() tagNumber: string = '';
  @Output() tagNumberChange: EventEmitter<string> = new EventEmitter();
  // @Input() weight: string = '';
  // @Output() weightChange: EventEmitter<string> = new EventEmitter()
  @Input() weightDate: Date = new Date();
  @Output() weightDateChange: EventEmitter<Date> = new EventEmitter();

  @Input() weight: IBulkWeight = null;
  @Output() weightChange: EventEmitter<IBulkWeight> =
    new EventEmitter<IBulkWeight>();

  public editBulkWeightForm = new FormGroup<{
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
      validators: [Validators.pattern(/^UK\d{12}$/), Validators.required],
      updateOn: 'blur',
    }),
  });

  constructor(private readonly modalService: NgxSmartModalService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const modal = this.modalService.get(Modals.EditBulkWeightModal);

    modal.onOpenFinished.subscribe(() => {
      console.warn(this.weight);
      
      this.editBulkWeightForm.patchValue({
        date: "2024-05-06",
        tagNumber: this.weight.tagNumber,
        weight: this.weight.weight,
      });
    });
  }

  public getCSSClassForDate() {
    if (this.dateControl.invalid && this.dateControl.dirty) {
      return 'is-invalid';
    } else if (this.dateControl.valid && this.dateControl.dirty) {
      return 'is-valid';
    }
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
}
