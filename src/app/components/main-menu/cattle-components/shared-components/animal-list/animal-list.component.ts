import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import {
  getAnimalByTag,
  getDams,
  getUnregisteredCalves,
  selectAnimals,
} from '@cms-ngrx/animal';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'cms-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css'],
})
export class AnimalListComponent implements OnInit, OnDestroy {
  @Output() add: EventEmitter<Animal> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() animalSelected: EventEmitter<Animal> = new EventEmitter();
  @Input() page: PageURLs;
  public searchBarGroup: FormGroup = new FormGroup({});
  public animals$: Observable<Animal[]>;
  public searchedAnimals$: BehaviorSubject<Animal[]> = new BehaviorSubject([]);

  private currentAnimal: Animal;
  private $currentAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  private subscriptions: Subscription = new Subscription();
  private searched = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.trackAnimalSelect();
    this.populateAnimals();

    this.setUpList();
    this.trackSearch();
  }

  public openAddModal(animal: Animal) {
    this.add.emit(animal);
  }

  public openEditModal() {
    this.edit.emit(null);
  }

  public selectAnimal(animal: Animal) {
    if (this.page === PageURLs.Animals) {
      this.currentAnimal = animal;
      this.pushNextAnimal(animal);
    } else {
      if (animal.tagNumber !== this.currentAnimal?.tagNumber) {
        this.currentAnimal = animal;
        this.pushNextAnimal(animal);
      }
    }
  }

  get pillButtonText(): string {
    switch (this.page) {
      case PageURLs.Weight:
        return 'Weights';
      case PageURLs.Animals:
        return 'Animal';
      case PageURLs.Births:
        return 'Births';
      case PageURLs.Registration:
        return 'Register Calf';
      default:
        return '';
    }
  }

  public getCSSForButton(animal: Animal) {
    return animal.tagNumber === this.currentAnimal?.tagNumber ? 'active' : '';
  }

  private populateAnimals() {
    if (this.page === PageURLs.Births) {
      this.animals$ = this.store
        .pipe(select(getDams))
        .pipe(
          map((animals) => animals.filter((animal) => this.notSold(animal)))
        );
    } else if (this.page === PageURLs.Registration) {
      this.animals$ = this.store.pipe(select(getUnregisteredCalves));
    } else {
      this.animals$ = this.store.pipe(select(selectAnimals));
    }
  }

  private notSold(animal: Animal) {
    return animal.weightData.every((weight) => !weight.weightType.isSale);
  }

  private pushNextAnimal(animal: Animal) {
    this.subscriptions.add(
      this.store
        .pipe(select(getAnimalByTag(animal.tagNumber)))
        .subscribe((ani) => {
          this.$currentAnimal.next(ani);
        })
    );
  }

  private setUpList() {
    this.searchBarGroup = this.fb.group({ searchBar: this.fb.control([]) });
  }

  private trackAnimalSelect() {
    this.subscriptions.add(
      this.$currentAnimal.subscribe((animal) => {
        this.animalSelected.emit(animal);
      })
    );
  }

  private trackSearch() {
    this.subscriptions.add(
      this.animals$
        .pipe(takeWhile(() => !this.searched, true))
        .subscribe((animals) => this.searchedAnimals$.next(animals))
    );
    this.subscriptions.add(
      combineLatest([this.searchBarValChange, this.animals$]).subscribe(
        ([value, animals]: [string, Animal[]]) => {
          this.searched = true;
          if (value.length > 2) {
            if (document.getElementById('animalList')) {
              document.getElementById('animalList').scrollTop = 0;
            }

            this.searchedAnimals$.next(this.getSearchedAnimals(animals, value));
            this.$currentAnimal.next(
              this.searchedAnimals$.value.find(
                (animal) => animal.tagNumber === this.currentAnimal?.tagNumber
              )
            );
          } else {
            this.searchedAnimals$.next(animals);
            this.$currentAnimal.next(
              animals.find(
                (animal) => animal.tagNumber === this.currentAnimal?.tagNumber
              )
            );
          }
        }
      )
    );
  }

  private getSearchedAnimals(animals: Animal[], value: string): Animal[] {
    return animals.filter(
      (animal) =>
        animal.tagNumber.toLowerCase().includes(value.toLowerCase()) ||
        animal.name?.toLowerCase().includes(value.toLowerCase())
    );
  }

  private get searchBarValChange() {
    return this.searchBarGroup.get('searchBar').valueChanges;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
