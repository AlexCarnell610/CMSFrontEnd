import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Modals } from '@cms-enums';
import { Animal, Bull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getDams } from '@cms-ngrx/animal';
import { selectBulls as getBulls } from '@cms-ngrx/bull';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';

enum FormControls {
  TagNumber = 'newTagNumber',
  Gender = 'gender',
  DOB = 'dob',
  Dam = 'dam',
  Sire = 'sire',
}
@Component({
  selector: 'cms-animal-modal',
  templateUrl: './animal-modal.component.html',
  styleUrls: ['./animal-modal.component.css'],
})
export class AnimalModalComponent implements OnInit, AfterViewInit {
  @Input() animal: Animal = null;
  @Input() isAddMode: boolean;
  public animalForm: FormGroup = new FormGroup({});
  public $dams: Observable<Animal[]>;
  public $sires: Observable<Bull[]>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<RootState>,
    private readonly modals: NgxSmartModalService
  ) {}

  ngOnInit(): void {
    this.animalForm = this.fb.group({
      newTagNumber: this.fb.control(['UK722218'], {
        validators: Validators.pattern(/^UK\d{12}$/),
        updateOn: 'blur',
      }),
      gender: this.fb.control([], Validators.required),
      dob: this.fb.control([], this.dobValidator()),
      dam: this.fb.control([], Validators.required),
      sire: this.fb.control([], Validators.required),
    });
    // this.sire.setValue('');
    // this.dam.setValue('');
    this.$dams = this.store.pipe(select(getDams));
    this.$sires = this.store.pipe(select(getBulls));

    this.tagNumber.valueChanges.subscribe((val) => {
      console.warn(this.tagNumber.errors);
      console.warn(this.tagNumber.valid);
      console.warn(this.tagNumber.dirty);
    });
  }

  ngAfterViewInit() {
    this.trackModalEvents();
  }

  public save(){
    console.warn("HELLO");
    this.markAllAsDirty();
  }

  public closeModal() {
    this.modals.get(Modals.Animal).close();
  }

  private markAllAsDirty(){
    this.sire.markAsDirty();
    this.dam.markAsDirty();
    this.tagNumber.markAsDirty();
    this.dob.markAsDirty();
    this.gender.markAsDirty();
  }

  private trackModalEvents() {
    this.modals.get(Modals.Animal).onAnyCloseEventFinished.subscribe(() => {
      this.clearForm();
    });
  }

  private clearForm() {
    this.animalForm.reset({ newTagNumber: 'UK722218' }, { emitEvent: false });
  }

  private dobValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (moment().diff(moment(control.value), 'days') < 0) {
        return { dob: 'DOB cant be in the future' };
      } else {
        return null;
      }
    };
  }

  public get tagNumber() {
    return this.animalForm.get(FormControls.TagNumber);
  }

  public get gender() {
    return this.animalForm.get(FormControls.Gender);
  }

  public get sire() {
    return this.animalForm.get(FormControls.Sire);
  }

  public get dam() {
    return this.animalForm.get(FormControls.Dam);
  }

  public get dob() {
    return this.animalForm.get(FormControls.DOB);
  }
}
