import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Gender, Modals } from '@cms-enums';
import { IAnimal, IBreedCode, IBull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getDams, selectAnimals } from '@cms-ngrx/animal';
import { selectBullByTag, selectBulls as getBulls } from '@cms-ngrx/bull';
import {
  AnimalBreedService,
  AnimalUpdateService,
  LoadingPaneService,
  WarningService,
} from '@cms-services';
import { breedValidator, dateValidator } from '@cms-validators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

enum FormControls {
  TagNumber = 'newTagNumber',
  GenderControl = 'gender',
  DOB = 'dob',
  Dam = 'dam',
  Sire = 'sire',
  Breed = 'breed',
  Registered = 'registered',
  Name = 'name',
}
@Component({
  selector: 'cms-animal-modal',
  templateUrl: './animal-modal.component.html',
  styleUrls: ['./animal-modal.component.scss'],
})
export class AnimalModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() animal: IAnimal = null;
  @ViewChild('p') popover: NgbPopover;
  public animalForm: FormGroup = new FormGroup({});
  public $dams: Observable<IAnimal[]>;
  public $sires: Observable<IBull[]>;
  public saveResult: { message: string; success: boolean } = {
    message: '',
    success: true,
  };
  public dropDownHidden = true;
  public breedsList;
  public isAddMode: boolean = false;
  public newSire = false
  private $animals: Observable<IAnimal[]>;
  private previousFormValue;
  private noSireText = 'No sire assigned';
  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<RootState>,
    private readonly modals: NgxSmartModalService,
    private readonly animalUpdateService: AnimalUpdateService,
    private readonly loadingService: LoadingPaneService,
    private readonly warningService: WarningService,
    private readonly breedService: AnimalBreedService
  ) {}

  ngOnInit(): void {
    this.setUpForm();
    this.breedsList = this.breedService.breedCodeObjects;
    this.$dams = this.store.pipe(select(getDams));
    this.$sires = this.store.pipe(select(getBulls));
    this.$animals = this.store.pipe(select(selectAnimals));
  }

  ngAfterViewInit() {
    this.trackModalEvents();
  }

  public save() {
    this.subs.add(
      this.handlePopoverErrors().subscribe((canContinue) => {
        if (this.isAddMode) {
          this.markAllAsDirty();
          if (canContinue) {            
            this.loadingService.setLoadingState(true);
            const newAnimal: IAnimal = {
              ai: [],
              birthDate: this.dob.value,
              calvingHistory: [],
              dam: this.dam.value,
              gender: this.gender.value,
              managementTag: 'null',
              sire: {
                tagNumber: this.sire.value == 'UK' ? '' : this.sire.value,
              },
              tagNumber: this.tagNumber.value,
              weightData: [],
              breed: this.breedService.isBreedCode(this.breed.value)
                ? this.breed.value
                : this.breedService.getCodeFromBreed(this.breed.value),
              registered: this.isRegistered,
              name: this.name.value ? this.name.value : null,
            };
            this.newSire ? this.saveBullAndAnimal(newAnimal) : this.addAnimal(newAnimal)
          }
        } else {
          this.tagNumber.disable();
          if (canContinue) {
            this.loadingService.setLoadingState(true);
            const animalUpdate: Partial<IAnimal> = {
              birthDate: this.dob.value,
              dam: this.dam.value,
              sire: { tagNumber: this.noSire() ? '' : this.sire.value },
              gender: this.gender.value,
              breed: this.breedService.isBreedCode(this.breed.value)
                ? this.breed.value
                : this.breedService.getCodeFromBreed(this.breed.value),
              registered: this.isRegistered,
              name: this.name.value ? this.name.value : null,
            };
            
            this.newSire ? this.saveBullAndAnimal(animalUpdate as IAnimal) : this.updateAnimal(animalUpdate)
          }
        }
      })
    );
  }

  private saveBullAndAnimal(calf: IAnimal): void {
    this.store
      .select(selectBullByTag(this.sire.value))
      .pipe(take(1))
      .subscribe((bull) => {
        this.animalUpdateService.addBull(bull).then(() => {
          this.isAddMode ? this.addAnimal(calf) : this.updateAnimal(calf);
        });
      });
  }

  private addAnimal(newAnimal:IAnimal): void{
    this.animalUpdateService.addAnimal(newAnimal).then(() => {
      this.saveResult.message = 'Animal Saved';
      this.saveResult.success = true;

      this.clearForm();
      this.loadingService.setLoadingState(false);
      this.handlePopover(this.previousFormValue ? 500 : 1000);
    });
  }

  private updateAnimal(animal: Partial<IAnimal>): void{
    this.animalUpdateService
    .updateAnimal(this.animal.tagNumber, animal)
    .then(() => {
      this.saveResult.message = 'Animal Updated';
      this.saveResult.success = true;

      this.loadingService.setLoadingState(false);
      this.handlePopover(1000);
    });
  }

  private getCSSForPopover() {
    return this.saveResult.success ? 'update-success' : 'update-error';
  }

  public getCSSClassForDOB() {
    if (this.dob.invalid && this.dob.dirty) {
      return 'is-invalid';
    } else if (this.dob.valid && this.dob.dirty) {
      return 'is-valid';
    }
  }

  public getCSSClassForName() {
    if (this.name.valid && this.name.dirty && this.name.value?.length > 0) {
      return 'is-valid';
    } else {
      return '';
    }
  }

  public getCSSClassForBreed() {
    if (this.breed.invalid && this.breed.dirty) {
      return 'is-invalid';
    } else if (this.breed.valid && this.breed.dirty) {
      return 'is-valid';
    }
  }

  public getCSSForRegisteredNo() {
    if (this.registered.invalid && this.registered.dirty) {
      return 'btn-outline-danger';
    } else if (this.registered.value === 'no') {
      return 'active';
    }
  }

  public getCSSForRegisteredYes() {
    if (this.registered.invalid && this.registered.dirty) {
      return 'btn-outline-danger';
    } else if (this.registered.value === 'yes') {
      return 'active';
    }
  }

  get selectedBreed$(): Observable<IBreedCode> {
    return this.breed.valueChanges;
  }

  get sireControlName(): string {
    return 'sire';
  }

  get breedControlName(): string {
    return 'breed';
  }

  public closeModal() {
    this.modals.get(Modals.Animal).close();
  }

  private noSire(): boolean {
    return this.sire.value == 'UK' || this.sire.value == this.noSireText;
  }

  private handlePopoverErrors(): Observable<boolean> {
    const output: BehaviorSubject<boolean> = new BehaviorSubject(null);
    if (!this.isAddMode) {
      this.tagNumber.disable();
    }
    this.markAllAsDirty();
    if (this.sire.value == 'UK' || this.sire.value == '') {
      this.sire.disable();
    }
    if (this.animalForm.valid) {
      this.sire.enable();
      if (!this.valuesChanged()) {
        this.saveResult.message = 'No changes made';
        this.saveResult.success = false;
        this.handlePopover(3000);
        output.next(false);
      } else {
        this.subs.add(
          this.$animals.pipe(take(1)).subscribe((animals) => {
            if (this.damNotExists(animals)) {
              this.warningService
                .show({
                  header: 'The dam tag you entered does not exist',
                  body: 'Continuing will add it to the database',
                })
                .subscribe((result) => {
                  if (result) {
                    this.addDam(this.dam.value).then(() => {
                      this.loadingService.setLoadingState(false);
                      output.next(true);
                    });
                  } else {
                    output.next(result);
                  }
                });
            } else if (
              this.enteredTagIsMale(animals) &&
              !this.previousFormValue
            ) {
              this.warningService
                .show({
                  header: 'The animal entered for the dam is male',
                  body: 'Please edit it to continue',
                  buttonText: 'Go to edit',
                  isError: true,
                })
                .subscribe((result) => {
                  if (result) {
                    output.next(false);
                    this.previousFormValue = this.animalForm.value;
                    this.animal = this.getEnteredDam(animals);
                    this.isAddMode = false;
                    this.setData();
                  } else {
                    output.next(false);
                  }
                });
            } else {
              output.next(true);
            }
          })
        );
      }
    } else {
      this.sire.enable();
      this.saveResult.message = 'Please fix errors';
      this.saveResult.success = false;
      this.handlePopover(3000);
      output.next(false);
    }
    return output;
  }

  private getEnteredDam(animals: IAnimal[]) {
    return animals.find((animal) => animal.tagNumber === this.dam.value);
  }

  private enteredTagIsMale(animals: IAnimal[]): boolean {
    return (
      this.dam.value !== 'UK000000000000' &&
      animals.find((animal) => animal.tagNumber === this.dam.value)?.gender ===
        Gender.Male
    );
  }

  private damNotExists(animals: IAnimal[]): boolean {
    return (
      this.dam.value !== 'UK000000000000' &&
      animals.findIndex((animal) => animal.tagNumber === this.dam.value) === -1
    );
  }

  private addDam(tagNumber: string) {
    const newAnimal: IAnimal = {
      ai: [],
      birthDate: moment(),
      calvingHistory: [],
      dam: null,
      gender: Gender.Female,
      managementTag: 'null',
      sire: {tagNumber: null},
      tagNumber,
      weightData: [],
      breed: 'UNAV',
      registered: false,
    };
    this.loadingService.setLoadingState(true);
    return this.animalUpdateService.addAnimal(newAnimal);
  }

  private valuesChanged(): boolean {
    return (
      this.animal?.sire.tagNumber !== this.convertSireValue(this.sire.value) ||
      this.animal?.dam.tagNumber !== this.dam.value ||
      this.animal?.birthDate.format('yyyy-MM-DD') !== this.dob.value ||
      this.animal?.gender !== this.gender.value ||
      this.breedChanged() ||
      this.animal?.registered !== this.isRegistered ||
      this.animal?.name !== this.name.value
    );
  }

  private get isRegistered() {
    return this.registered.value === 'yes';
  }

  private breedChanged() {
    return this.animal?.breed !== undefined
      ? this.breedService.getBreedCode(this.animal.breed) !==
          this.breedService.getBreedCode(this.breed.value)
      : true;
  }

  private convertSireValue(sire: string) {
    return sire === 'No sire assigned' || sire === 'UK' ? 'null' : sire;
  }

  private setData() {
    if (!this.isAddMode) {
      this.dob.setValue(this.animal.birthDate.format('yyyy-MM-DD'));
      this.dam.setValue(this.animal.dam.tagNumber);
      this.sire.setValue(
        this.animal.sire.tagNumber !== 'null'
          ? this.animal.sire.tagNumber
          : this.noSireText
      );
      this.gender.setValue(this.animal.gender);
      this.breed.setValue(
        this.breedService.getBreedFromCode(this.animal.breed)
      );
      this.registered.setValue(this.animal.registered ? 'yes' : 'no');
      this.name.setValue(this.animal.name);
    }
  }

  private setUpForm() {
    this.animalForm = this.fb.group({
      newTagNumber: this.fb.control(['UK'], {
        validators: [Validators.pattern(/^UK\d{12}$/), Validators.required],
        updateOn: 'blur',
      }),
      gender: this.fb.control([], Validators.required),
      dob: this.fb.control([], [Validators.required, dateValidator()]),
      breed: this.fb.control([], {
        validators: breedValidator(this.breedService),
        updateOn: 'blur',
      }),
      dam: this.fb.control(['UK'], {
        validators: Validators.pattern(/^UK\d{12}$/),
        updateOn: 'blur',
      }),
      sire: this.fb.control(['UK'], {
        validators: Validators.required,
        updateOn: 'change',
      }),
      registered: this.fb.control([], Validators.required),
      name: this.fb.control('', {}),
    });
  }

  private handlePopover(time: number) {
    this.popover.popoverClass = this.getCSSForPopover();
    this.popover.ngbPopover = this.saveResult.message;

    this.popover.open();
    timer(time).subscribe(() => {
      this.popover.close();
      if (this.saveResult.success) {
        if (this.previousFormValue) {
          this.isAddMode = true;
          this.animalForm.setValue(this.previousFormValue);
          this.tagNumber.enable();
          this.previousFormValue = null;
        } else {
          this.closeModal();
        }
      }
    });
  }

  private markAllAsDirty() {
    if (this.sire.value == 'UK') {
      this.sire.markAsPristine();
    } else if (this.sire.value == '') {
      this.sire.markAsPristine();
    } else {
      this.sire.markAsDirty();
    }

    this.dam.markAsDirty();
    this.tagNumber.markAsDirty();
    this.dob.markAsDirty();
    this.gender.markAsDirty();
    this.breed.markAsDirty();
    this.registered.markAsDirty();
    this.name.markAsDirty();
  }

  private trackModalEvents() {
    const animalModal = this.modals.get(Modals.Animal);
    this.subs.add(
      animalModal.onAnyCloseEventFinished.subscribe((value) => {
        animalModal.removeData();
        this.clearForm();
      })
    );
    this.subs.add(
      animalModal.onOpenFinished.subscribe(() => {
        this.newSire = false
        this.isAddMode = animalModal.getData().isAdd;
        this.animalForm.enable();
        this.setData();
      })
    );
  }

  private clearForm() {
    this.animalForm.reset(
      { newTagNumber: 'UK', dam: 'UK' },
      { emitEvent: false }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public get tagNumber() {
    return this.animalForm.get(FormControls.TagNumber);
  }

  public get gender() {
    return this.animalForm.get(FormControls.GenderControl);
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
  public get breed() {
    return this.animalForm.get(FormControls.Breed);
  }
  public get registered() {
    return this.animalForm.get(FormControls.Registered);
  }

  public get name() {
    return this.animalForm.get(FormControls.Name);
  }
}
