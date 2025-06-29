import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AssistanceReason, CalvingAssistance, Modals } from '@cms-enums';
import {
  age,
  IAnimal,
  IBull,
  CalvingStat,
  IBreedCode,
  isAnimal,
} from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getCalves, selectAnimals } from '@cms-ngrx/animal';
import { selectBullByTag } from '@cms-ngrx/bull';
import {
  AnimalBreedService,
  AnimalUpdateService,
  LoadingPaneService,
  WarningService,
} from '@cms-services';
import { breedValidator, dateValidator } from '@cms-validators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subscription,
  timer,
} from 'rxjs';
import { take } from 'rxjs/operators';

export enum BirthFormControls {
  CalfTag = 'calfTag',
  DOB = 'dob',
  Breed = 'calfBreed',
  Sire = 'calfSire',
  Gender = 'gender',
  Calves = 'calves',
  Registered = 'registered',
  ManagementTag = 'managementTag'
}

@Component({
  selector: 'cms-birth-modal',
  templateUrl: './birth-modal.component.html',
  styleUrls: ['./birth-modal.component.scss'],
})
export class BirthModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() animal: IAnimal;
  @Input() isAdd: boolean = false;
  @ViewChild('errorPop') statPopover: NgbPopover;
  public birthForm: UntypedFormGroup;
  public $filteredSires: BehaviorSubject<IBull[]> = new BehaviorSubject(null);
  public breeds: IBreedCode[] = [];
  public $calves: Observable<IAnimal[]> = new Observable();
  public stat: CalvingStat = null;
  public statErrors = { stats: 'Please add calving statistic' };
  public saveResult: { message: string; success: boolean } = {
    message: '',
    success: true,
  };
  public calfSelected: boolean = false;
  public truncNotes: string = '';
  public newSire = false;
  private subs: Subscription = new Subscription();
  private longLifeSubs: Subscription = new Subscription();
  private hasSaved: boolean = false;
  private selectedCalf: IAnimal;

  constructor(
    private readonly modalService: NgxSmartModalService,
    private readonly fb: UntypedFormBuilder,
    private readonly animalService: AnimalUpdateService,
    private readonly store: Store<RootState>,
    private readonly breedService: AnimalBreedService,
    private readonly warningService: WarningService,
    private readonly loadingService: LoadingPaneService
  ) {}

  ngOnInit(): void {
    this.breeds = this.breedService.breedCodeObjects;
    this.setUpForm();
  }

  ngAfterViewInit() {
    this.trackModalEvents();
  }

  public get isDirty():boolean{
    return this.birthForm.dirty
  }

  public save() {
    this.hasSaved = true;
    this.subs.add(
      this.handleErrors().subscribe((canContinue) => {
        if (canContinue && isAnimal(canContinue)) {
          const calf = canContinue;
          this.loadingService.setLoadingState(true);
          if (this.newSire) {
            this.saveBullAndAnimal(calf);
          } else {
            this.isAdd ? this.saveAnimal(calf) : this.updateAnimal(calf);
          }
        }
      })
    );
  }

  public get assistReason(): string[] {
    const output = [];
    this.stat.assistanceReason.forEach((stat: AssistanceReason) => {
      switch (stat) {
        case AssistanceReason.BigCalf:
          output.push('Big Calf');
          break;
        case AssistanceReason.PoorPresentation:
          output.push(' Poor Presentation');
          break;
        case AssistanceReason.NA:
          output.push('None');
      }
    });
    return output;
  }

  public get assistRequired(): string {
    switch (this.stat.assistance) {
      case CalvingAssistance.Required:
        return 'Assistance required';
      case CalvingAssistance.Vet:
        return 'Vet required';
      case CalvingAssistance.None:
        return 'No assistance';
      default: return "Error"
    }
  }

  public statSaved(event: CalvingStat | false) {
    if (event) {
      if (event.calvingNotes?.length > 21) {
        this.truncNotes = event.calvingNotes.slice(0, 21) + '...';
      }
      this.stat = event;
    }
  }

  public close() {
    this.modalService.get(Modals.Birth).close();
  }

  public addStats() {
    this.modalService.get(Modals.CalvingStats).open();
  }

  public getCSSForDOB() {
    if (this.dob.invalid && this.dob.dirty) {
      return 'is-invalid';
    } else if (this.dob.valid && this.dob.dirty) {
      return 'is-valid';
    }
  }

  public getCSSForBreed(): string {
    if (this.breed.invalid && this.breed.dirty) {
      return 'is-invalid';
    } else if (this.breed.valid && this.breed.dirty) {
      return 'is-valid';
    }
  }

  public getCSSForCalvingStats(): string {
    return this.hasSaved && !this.stat ? 'invalid-label' : '';
  }

  get selectedBreed$(): Observable<string> {
    return this.birthForm.get(BirthFormControls.Breed).valueChanges;
  }

  private updateAnimal(animal: IAnimal): void {
    this.animalService.updateAnimal(this.calfSelect.value, animal).then(() => {
      this.saveResult.message = 'Calf updated';
      this.saveResult.success = true;
      this.loadingService.setLoadingState(false);
      this.handlePopover(1500);
    });
  }

  private saveAnimal(animal: IAnimal): void {
    this.animalService.addAnimal(animal).then(() => {
      this.saveResult.message = 'Calf added';
      this.saveResult.success = true;
      this.loadingService.setLoadingState(false);
      this.handlePopover(1500);
    });
  }

  private saveBullAndAnimal(calf: IAnimal): void {
    this.store
      .select(selectBullByTag(this.sire.value))
      .pipe(take(1))
      .subscribe((bull) => {
        this.animalService.addBull(bull).then(() => {
          this.isAdd ? this.saveAnimal(calf) : this.updateAnimal(calf);
        });
      });
  }

  private handleErrors(): BehaviorSubject<boolean | IAnimal> {
    const output: BehaviorSubject<boolean | IAnimal> = new BehaviorSubject(
      null
    );
    let calf: IAnimal;
    if (this.isAdd) {
      this.calfSelect.disable({ emitEvent: false });
    } else {
      this.calfTag.disable();
    }
    this.markAllAsDirty();
    if (this.birthForm.valid && this.stat) {
      calf = this.getNewCalf();

      if (!this.valuesEdited(calf)) {
        this.saveResult.message = 'No changes made';
        this.saveResult.success = false;
        this.handlePopover(3000);
        output.next(false);
      } else if (age(calf.birthDate, 'days') > 28 && this.isAdd) {
        this.warningService
          .show({ header: 'Entered age is more than 28 days' })
          .subscribe((result) => output.next(result ? calf : result));
      } else {
        if (this.isAdd) {
          this.store
            .pipe(select(selectAnimals), take(1))
            .subscribe((animals) => {
              if (this.animalExists(animals)) {
                this.warningService
                  .show({
                    header: `Animal with tag ${this.calfTag.value} already exists`,
                    body: 'Please check the tag number and try again.',
                    isError: true,
                    showCloseButton: false,
                    buttonText: 'Close',
                  })
                  .subscribe(() => {
                    output.next(false);
                  });
              } else {
                output.next(calf);
              }
            });
        } else {
          output.next(calf);
        }
      }
    } else {
      this.saveResult.message = 'Please fix errors';
      this.saveResult.success = false;
      this.handlePopover(3000);
      output.next(false);
    }
    return output;
  }

  private animalExists(animals: IAnimal[]) {
    return (
      animals.findIndex((animal) => animal.tagNumber === this.calfTag.value) !==
      -1
    );
  }

  private getNewCalf(): IAnimal {
    return {
      tagNumber: this.calfTag.value,
      managementTag: this.managementTag.value.toUpperCase(),
      damTag: this.animal.tagNumber,
      sire: { tagNumber: this.sire.value },
      birthDate: moment(this.dob.value),
      gender: this.gender.value,
      breed: this.breedService.getBreedCode(this.breed.value),
      calvingStat: this.stat,
      ai: [],
      calvingHistory: [],
      weightData: [],
      registered: this.isRegistered,
    };
  }

  private getCSSForPopover() {
    return this.saveResult.success ? 'update-success' : 'update-error';
  }

  private handlePopover(time: number) {
    this.statPopover.popoverClass = this.getCSSForPopover();
    this.statPopover.ngbPopover = this.saveResult.message;

    this.statPopover.open();
    if (!this.isAdd && this.saveResult.success) {
      this.resetForm();
    }

    this.subs.add(
      timer(time).subscribe(() => {
        this.statPopover.close();
        if (this.isAdd && this.saveResult.success) {
          this.close();
        }
      })
    );
  }

  private markAllAsDirty() {
    this.calfSelect.markAsDirty();
    this.dob.markAsDirty();
    this.breed.markAsDirty();
    this.sire.markAsDirty();
    this.gender.markAsDirty();
    this.calfTag.markAsDirty();
    this.registered.markAsDirty();
    this.managementTag.markAsDirty()
  }

  private valuesEdited(calf: IAnimal) {
    return (
      calf.birthDate.format('DD-MM-YYYY') !==
        this.selectedCalf?.birthDate.format('DD-MM-YYYY') ||
      calf.breed !== this.selectedCalf?.breed ||
      calf.sire.tagNumber !== this.selectedCalf?.sire.tagNumber ||
      calf.gender !== this.selectedCalf?.gender ||
      this.statChanged() ||
      calf.registered !== this.selectedCalf?.registered ||
      calf.managementTag !== this.selectedCalf?.managementTag
    );
  }

  private statChanged() {
    const selectedCalfStat = this.selectedCalf?.calvingStat;
    return (
      selectedCalfStat === null ||
      this.stat.alive !== selectedCalfStat.alive ||
      this.stat.assistance !== selectedCalfStat.assistance ||
      this.stat.damHealth !== selectedCalfStat.damHealth ||
      this.stat.drinkAssist !== selectedCalfStat.drinkAssist ||
      this.stat.gettingUp !== selectedCalfStat.gettingUp ||
      this.stat.calvingNotes !== selectedCalfStat.calvingNotes ||
      this.reasonChanged()
    );
  }

  private reasonChanged() {
    const selectedCalfReason = this.selectedCalf?.calvingStat.assistanceReason;
    if (this.stat.assistanceReason.length === selectedCalfReason.length) {
      return !this.stat.assistanceReason.every(
        (initialReason) =>
          selectedCalfReason.findIndex((reason) => reason === initialReason) !==
          -1
      );
    } else {
      return true;
    }
  }

  private trackCalfSelect() {
    this.subs.add(
      combineLatest([this.calfSelect.valueChanges, this.$calves]).subscribe(
        ([val, calves]: [string, IAnimal[]]) => {
          this.newSire = false;
          const selectedCalf = calves.find((calf) => calf.tagNumber === val);
          if (!this.isAdd) {
            if (selectedCalf) {
              this.calfSelected = true;
              this.selectedCalf = selectedCalf;
              this.calfTag.setValue(selectedCalf.tagNumber);
              this.dob.setValue(selectedCalf.birthDate.format('YYYY-MM-DD'));
              this.breed.setValue(
                this.breedService.getBreedFromCode(selectedCalf.breed)
              );
              this.sire.setValue(selectedCalf.sire.tagNumber);
              this.gender.setValue(selectedCalf.gender);
              this.registered.setValue(selectedCalf.registered ? 'yes' : 'no');
              this.managementTag.setValue(selectedCalf.managementTag)
              this.stat = selectedCalf.calvingStat;
            } else {
              this.stat = null;
              this.calfSelected = false;
              this.resetForm(false);
            }
          }
        }
      )
    );
  }

  private get isRegistered() {
    return this.registered.value === 'yes';
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

  private trackModalEvents() {
    this.modalService
      .get(Modals.Birth)
      .onAnyCloseEventFinished.subscribe(() => {
        this.subs.unsubscribe();
        this.stat = null;
        this.hasSaved = false;
        this.truncNotes = '';
        this.resetForm();
        this.calfSelected = false;
      });

    this.modalService.get(Modals.Birth).onOpen.subscribe(() => {
      this.subs = new Subscription();
    });

    this.modalService.get(Modals.Birth).onOpenFinished.subscribe(() => {
      if (this.isAdd) {
        this.calfTag.enable();
        this.calfSelect.disable();
      } else {
        this.calfTag.disable();
        this.calfSelect.enable();
      }
      this.$calves = this.store.pipe(select(getCalves(this.animal.tagNumber)));
      this.trackCalfSelect();
    });
  }

  private setUpForm() {
    this.birthForm = this.fb.group({
      calves: this.fb.control([]),
      calfTag: this.fb.control(['UK722218'], {
        validators: [Validators.pattern(/^UK\d{12}$/), Validators.required],
        updateOn: 'blur',
      }),
      dob: this.fb.control([], [Validators.required, dateValidator()]),
      calfBreed: this.fb.control('', {
        validators: [Validators.required, breedValidator(this.breedService)],
        updateOn: 'blur',
      }),
      calfSire: this.fb.control([], Validators.required),
      gender: this.fb.control([], Validators.required),
      registered: this.fb.control(["REGED"], Validators.required),
      managementTag: this.fb.control([])
    });
  }

  private resetForm(emit = true) {
    this.birthForm.reset(
      { calfTag: 'UK722218', calves: '', calfSire: '' },
      { emitEvent: emit }
    );
  }

  get sireControlName(): string {
    return BirthFormControls.Sire;
  }

  get breedControlName(): string {
    return 'calfBreed';
  }

  public get dob() {
    return this.birthForm.get(BirthFormControls.DOB);
  }

  public get calfTag() {
    return this.birthForm.get(BirthFormControls.CalfTag);
  }

  public get breed() {
    return this.birthForm.get(BirthFormControls.Breed);
  }

  public get sire() {
    return this.birthForm.get(BirthFormControls.Sire);
  }

  public get gender() {
    return this.birthForm.get(BirthFormControls.Gender);
  }

  public get calfSelect() {
    return this.birthForm.get(BirthFormControls.Calves);
  }

  public get registered() {
    return this.birthForm.get(BirthFormControls.Registered);
  }

  public get managementTag() {
    return this.birthForm.get(BirthFormControls.ManagementTag);
  }

  ngOnDestroy() {
    this.longLifeSubs.unsubscribe();
  }
}
