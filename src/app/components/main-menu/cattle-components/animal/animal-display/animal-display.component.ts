import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Animal, Bull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectBullByTag } from '@cms-ngrx/bull';
import { AnimalUpdateService, ScreenSizeService } from '@cms-services';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cms-animal-display',
  templateUrl: './animal-display.component.html',
  styleUrls: ['./animal-display.component.css'],
})
export class AnimalDisplayComponent implements OnInit, OnDestroy {
  @Input() $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  @Output() editAnimal: EventEmitter<Animal> = new EventEmitter();
  public $sire: Observable<Bull>;
  public isEditNotes = false;
  public hasChangedNotes = false;
  public notesGroup: FormGroup = new FormGroup({});
  private subscriptions: Subscription = new Subscription();
  private animalTagNumber: string = null;
  private notes: string = null;

  constructor(
    private readonly store: Store<RootState>,
    public readonly screenService: ScreenSizeService,
    private readonly fb: FormBuilder,
    private readonly animalUpdate: AnimalUpdateService
  ) {}

  ngOnInit(): void {
    this.setUpForm();
    this.trackSire();
    this.trackAnimalChanges();
    this.trackNotesChanges();
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

  public getCSSForNotesEdit() {
    return !this.isEditNotes
      ? 'badge-info'
      : this.hasChangedNotes
      ? 'badge-success cms-notes-edit'
      : 'badge-success cms-disabled-pill cms-notes-edit';
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
    this.animalUpdate
      .updateAnimal(this.animalTagNumber, { notes: this.notesControl().value })
      .then(() => {});
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
        if (animal) {
          this.$sire = this.store.pipe(
            select(selectBullByTag, { tagNumber: animal.sire.tagNumber })
          );
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
