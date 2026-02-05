import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AnimalWeight, IAnimal, IBull, UNKNOWN_DAM_TAG } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getAnimalByTag } from '@cms-ngrx/animal';
import { selectBullByTag } from '@cms-ngrx/bull';
import {
  AnimalBreedService,
  AnimalUpdateService,
  ScreenSizeService,
} from '@cms-services';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
    selector: 'cms-animal-display',
    templateUrl: './animal-display.component.html',
    styleUrls: ['./animal-display.component.scss'],
    standalone: false
})
export class AnimalDisplayComponent implements OnInit, OnDestroy {
  @Input() basicMode = false
  @Input() $selectedAnimal: BehaviorSubject<IAnimal> = new BehaviorSubject(null);
  @Input() showGoToChild: boolean;
  @Output() editAnimal: EventEmitter<IAnimal> = new EventEmitter();
  @Output() goToDamOutput: EventEmitter<IAnimal> = new EventEmitter();
  @Output() goToChildEmit: EventEmitter<any> = new EventEmitter();
  public $sire: Observable<IBull>;
  public isEditNotes = false;
  public hasChangedNotes = false;
  public notesGroup: UntypedFormGroup = new UntypedFormGroup({});
  public saving = false;
  public saleWeight$: Observable<AnimalWeight>
  private subscriptions: Subscription = new Subscription();
  private animalTagNumber: string = null;
  private notes: string = null;


  constructor(
    private readonly store: Store<RootState>,
    public readonly screenService: ScreenSizeService,
    private readonly fb: UntypedFormBuilder,
    private readonly animalUpdate: AnimalUpdateService,
    private readonly breedService: AnimalBreedService
  ) {}

  ngOnInit(): void {
    this.setUpForm();
    this.trackSire();
    this.trackAnimalChanges();
    this.trackNotesChanges();

    this.saleWeight$ = this.$selectedAnimal.pipe(map(animal => animal.weightData.find(weight => weight.isSaleWeight)))
  }

  public goToDam(animal: IAnimal) {
    this.store
      .select(getAnimalByTag(animal.dam.tagNumber))
      .pipe(take(1))
      .subscribe((dam) => {
        this.goToDamOutput.emit(dam);
      });
  }

  public backToChild() {
    this.goToChildEmit.emit({});
  }

  public getBreedName(animal: IAnimal): string {
    return this.breedService.getBreedFromCode(animal.breed);
  }

  public getCSS() {
    return this.screenService.isSmallScreen
      ? 'small-screen-display'
      : 'cms-sticky';
  }

  public openEditModal() {
    this.editAnimal.emit(this.$selectedAnimal.value);
  }

  public editNotes() {
    if (!this.isEditNotes) {
      this.isEditNotes = true;
    } else if (this.isEditNotes && this.hasChangedNotes) {
      this.updateNotes();
    }
  }

  public cancelEdit() {
    this.isEditNotes = false;
    this.notesControl().setValue(this.notes);
  }

  public damTagNotProvided(): boolean {
    return this.$selectedAnimal.value.dam.tagNumber === UNKNOWN_DAM_TAG;
  }

  public getCSSForNotesEdit() {
    return !this.isEditNotes
      ? 'bg-info'
      : this.hasChangedNotes
      ? 'bg-success cms-notes-edit btn'
      : 'bg-success cms-disabled-pill cms-notes-edit';
  }

  private setUpForm() {
    this.notesGroup = this.fb.group({
      notes: this.fb.control([]),
    });
  }

  private trackNotesChanges() {
    this.notesControl().valueChanges.subscribe((val) => {
      this.hasChangedNotes = this.notes !== val;
    });
  }

  private updateNotes() {
    this.saving = true;
    this.animalUpdate
      .updateAnimal(this.animalTagNumber, { notes: this.notesControl().value })
      .then(() => {
        this.saving = false;
      });
  }

  private trackAnimalChanges() {
    this.subscriptions.add(
      this.$selectedAnimal.subscribe((animal) => {
        this.animalTagNumber = animal?.tagNumber;
        this.isEditNotes = false;
        this.notes = animal?.notes;
        this.notesControl().setValue(animal?.notes);
      })
    );
  }

  private trackSire() {
    this.subscriptions.add(
      this.$selectedAnimal.subscribe((animal) => {
        if (animal?.sire) {
          this.$sire = this.store.pipe(
            select(selectBullByTag(animal.sire.tagNumber)),
            map((bull) => {
              return {
                ...bull,
                tagNumber: bull.tagNumber.includes('UK000')
                  ? 'NA'
                  : bull.tagNumber,
              };
            })
          );
        }else {
          this.$sire = EMPTY
        }
      })
    );
  }



  private notesControl() {
    return this.notesGroup.get('notes');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
