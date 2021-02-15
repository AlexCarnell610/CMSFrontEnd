import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modals } from '@cms-enums';
import { Animal, Bull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getDams } from '@cms-ngrx/animal';
import { selectBulls as getBulls } from '@cms-ngrx/bull';
import { AnimalUpdateService, LoadingPaneService } from '@cms-services';
import { dateValidator } from '@cms-validators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable, timer } from 'rxjs';

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
  @ViewChild('p') popover: NgbPopover;
  public animalForm: FormGroup = new FormGroup({});
  public $dams: Observable<Animal[]>;
  public $sires: Observable<Bull[]>;
  public saveResult: { message: string; success: boolean } = {
    message: '',
    success: true,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<RootState>,
    private readonly modals: NgxSmartModalService,
    private readonly animalUpdateService: AnimalUpdateService,
    private readonly loadingService: LoadingPaneService
  ) {}

  ngOnInit(): void {
    this.setUpForm();
    this.$dams = this.store.pipe(select(getDams));
    this.$sires = this.store.pipe(select(getBulls));
  }

  ngAfterViewInit() {
    this.trackModalEvents();
  }

  public save() {
    if (this.isAddMode) {
      this.markAllAsDirty();
      if (this.handlePopoverErrors()) {
        this.loadingService.setLoadingState(true);
        const newAnimal: Animal = {
          ai: [],
          birthDate: this.dob.value,
          calvingHistory: [],
          calvingStats: [],
          dam: this.dam.value,
          gender: this.gender.value,
          managementTag: 'null',
          sire: this.sire.value,
          tagNumber: this.tagNumber.value,
          weightData: [],
        };
        this.animalUpdateService.addAnimal(newAnimal).then(() => {
          this.saveResult.message = 'Animal Saved';
          this.saveResult.success = true;

          this.clearForm();
          this.loadingService.setLoadingState(false);
          this.handlePopover(1000);
        });
      }
    } else {
      this.tagNumber.disable();
      if (this.handlePopoverErrors()) {
        const animalUpdate = {
          birthDate: this.dob.value,
          dam: this.dam.value,
          sire: this.sire.value,
          gender: this.gender.value,
        };
        this.animalUpdateService.updateAnimal(
          this.animal.tagNumber,
          animalUpdate
        );
      }
    }
  }

  public getCSSForPopover() {
    return this.saveResult.success ? 'update-success' : 'update-error';
  }

  public getCSSClassForDOB() {
    if (this.dob.invalid && this.dob.dirty) {
      return 'is-invalid';
    } else if (this.dob.valid && this.dob.dirty) {
      return 'is-valid';
    }
  }

  public closeModal() {
    this.modals.get(Modals.Animal).close();
  }

  private handlePopoverErrors() {
    if (this.animalForm.valid) {
      if (!this.valuesChanged()) {
        this.saveResult.message = 'No changes made';
        this.saveResult.success = false;
        this.handlePopover(3000);
        return false;
      }
      return true;
    } else {
      this.saveResult.message = 'Please fix errors';
      this.saveResult.success = false;
      this.handlePopover(3000);
      return false;
    }
  }

  private valuesChanged(): boolean {
    return (
      this.animal?.sire.tagNumber !== this.sire.value ||
      this.animal?.dam.tagNumber !== this.dam.value ||
      this.animal?.birthDate.format('yyyy-MM-DD') !== this.dob.value ||
      this.animal?.gender !== this.gender.value
    );
  }

  private setData() {
    if (!this.isAddMode) {
      this.dob.setValue(this.animal.birthDate.format('yyyy-MM-DD'));
      this.dam.setValue(this.animal.dam.tagNumber);
      this.sire.setValue(this.animal.sire.tagNumber);
      this.gender.setValue(this.animal.gender);
    }
  }

  private setUpForm() {
    this.animalForm = this.fb.group({
      newTagNumber: this.fb.control(['UK'], {
        validators: Validators.pattern(/^UK\d{12}$/),
        updateOn: 'blur',
      }),
      gender: this.fb.control([], Validators.required),
      dob: this.fb.control([], [Validators.required, dateValidator()]),
      dam: this.fb.control([], Validators.required),
      sire: this.fb.control([], Validators.required),
    });
    this.sire.setValue('');
    this.dam.setValue('');
  }

  private handlePopover(time: number) {
    this.popover.popoverClass = this.getCSSForPopover();
    this.popover.ngbPopover = this.saveResult.message;

    this.popover.open();
    timer(time).subscribe(() => {
      this.popover.close();
      if (this.saveResult.success) {
        this.closeModal();
      }
    });
  }

  private markAllAsDirty() {
    this.sire.markAsDirty();
    this.dam.markAsDirty();
    this.tagNumber.markAsDirty();
    this.dob.markAsDirty();
    this.gender.markAsDirty();
  }

  private trackModalEvents() {
    const animalModal = this.modals.get(Modals.Animal);
    animalModal.onAnyCloseEventFinished.subscribe(() => {
      this.clearForm();
    });
    animalModal.onOpenFinished.subscribe(() => {
      this.animalForm.enable();
      this.setData();
    });
  }

  private clearForm() {
    this.animalForm.reset({ newTagNumber: 'UK722218' }, { emitEvent: false });
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
