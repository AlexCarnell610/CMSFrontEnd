import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { PageURLs } from '@cms-enums';
import { Animal, IAnimal, IBull, IDobRange, isAnimal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import {
  getAnimalByTag,
  getDams,
  getUnregisteredCalves,
  selectAnimals,
} from '@cms-ngrx/animal';
import { selectBullByTag, selectBulls } from '@cms-ngrx/bull';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  iif,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { map, mergeMap, startWith, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'cms-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalListComponent implements OnInit, OnDestroy {
  @Output() add: EventEmitter<IAnimal> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() animalSelected: EventEmitter<Animal> = new EventEmitter();
  @Output() mutiAnimalsSelected: EventEmitter<Animal[]> = new EventEmitter();
  @Input() page: PageURLs;
  @Input() displayBulls = false;
  @Input() sortOldToYoung = false;
  @Input() sortYoungToOld = false;
  @Input() dateRange$: Observable<IDobRange>;
  @Input() filterByDOB = false;
  @Input() multiSelect = false;
  public searchBarGroup: UntypedFormGroup = new UntypedFormGroup({});
  public animals$: Observable<Animal[]>;
  public searchedAnimals$: BehaviorSubject<Animal[]> = new BehaviorSubject([]);
  public includeSoldAnimalsFormControl = new FormControl(false);

  private currentAnimal: Animal;
  private $currentAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  private subscriptions: Subscription = new Subscription();
  private searched = false;
  private multiSelectedAnimals: Animal[] = [];

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.trackAnimalSelect();
    this.populateAnimals();
    this.setUpList();
    this.trackSearch();
  }

  public openAddModal(animal: IAnimal) {
    this.add.emit(animal);
  }

  public openEditModal(animal: Animal) {
    this.selectAnimal(animal);
    this.edit.emit(null);
  }

  public resetSelection(): void {
    this.multiSelectedAnimals = [];
    this.mutiAnimalsSelected.emit(this.multiSelectedAnimals);
  }

  public selectAll(): void {
    this.multiSelectedAnimals = [...this.searchedAnimals$.getValue()];
    this.mutiAnimalsSelected.emit(this.multiSelectedAnimals);
  }

  public isSold(animal: Animal): boolean {
    return isAnimal(animal) && !!animal.salePrice
  }

  public selectAnimal(animal: Animal) {
    if (this.page === PageURLs.Animals) {
      this.currentAnimal = animal;
      this.pushNextAnimal(animal);
    } else if (animal.tagNumber !== this.currentAnimal?.tagNumber) {
      this.currentAnimal = this.multiSelect ? null : animal;
      this.pushNextAnimal(animal);
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

  public getCSSForButton(animal: IAnimal): 'active' | '' {
    if (!this.multiSelect) {
      return animal.tagNumber === this.currentAnimal?.tagNumber ? 'active' : '';
    } else {
      return this.animalMultiSelected(animal) ? 'active' : '';
    }
  }

  private populateAnimals() {
    if (this.page === PageURLs.Births) {
      this.animals$ = this.store.pipe(select(getDams));
    } else if (this.page === PageURLs.Registration) {
      this.animals$ = this.store.pipe(select(getUnregisteredCalves));
    } else if (this.page === PageURLs.Animals) {
      this.animals$ = combineLatest([
        this.store.select(selectAnimals),
        this.store.select(selectBulls),
      ]).pipe(map(([animals, bulls]) => [...animals, ...bulls]));
    } else if (this.page === PageURLs.WeightAnalysis) {
      this.subscriptions.add(
        this.dateRange$.subscribe(() => {
          this.resetSelection();
        })
      );
      this.animals$ = combineLatest([
        this.dateRange$.pipe(startWith({ from: null, to: null })),
        this.selectAnimals$,
      ]).pipe(
        map(([dateRange, animals]) => {
          return dateRange.from && dateRange.to
            ? this.dateRangeFilters(this.filterByDOB, dateRange, animals)
            : animals;
        })
      );
    } else {
      this.animals$ = this.selectAnimals$;
    }

    this.animals$ = combineLatest([this.animals$, this.includeSoldAnimalsFormControl.valueChanges.pipe(startWith(this.includeSoldAnimalsValue))]).pipe(
      map(([animals, includeSold]) =>
        animals.filter((animal) => {
          return (
            (isAnimal(animal) &&
             ( !!animal.salePrice === includeSold || animal.salePrice === null)) ||
            !isAnimal(animal)
          );
        })
      )
    );
  }

  private dateRangeFilters(
    filterDob: boolean,
    dateRange: IDobRange,
    animals: IAnimal[]
  ): IAnimal[] {
    if (filterDob) {
      return animals.filter((animal) =>
        animal.birthDate.isBetween(dateRange.from, dateRange.to, 'day', '[]')
      );
    } else if (!filterDob) {
      return animals.filter((animal) =>
        animal.weightData.some((data) =>
          data.weightDate.isBetween(dateRange.from, dateRange.to, 'day', '[]')
        )
      );
    }
  }

  private get selectAnimals$(): Observable<IAnimal[]> {
    return this.store
      .select(selectAnimals)
      .pipe(map((animals) => [...animals]));
  }

  private notSold(animal: IAnimal) {
    return animal.weightData.every((weight) => !weight.isSaleWeight);
  }

  private pushNextAnimal(selectedAnimal: Animal) {
    this.subscriptions.add(
      this.getAnimal(selectedAnimal.tagNumber)
        .pipe(
          mergeMap((animal) =>
            iif(
              () => !!animal,
              of(animal),
              this.getBull(selectedAnimal.tagNumber)
            )
          )
        )
        .subscribe((ani) => {
          if (!this.multiSelect) {
            this.$currentAnimal.next(ani);
          } else {
            if (this.animalMultiSelected(ani)) {
              this.multiSelectedAnimals.splice(
                this.findMultiSelectedAnimalIndex(ani),
                1
              );
              this.mutiAnimalsSelected.emit(this.multiSelectedAnimals);
            } else {
              this.multiSelectedAnimals.push(ani);
              this.mutiAnimalsSelected.emit(this.multiSelectedAnimals);
            }
          }
        })
    );
  }

  private animalMultiSelected(animal: Animal): boolean {
    return this.findMultiSelectedAnimalIndex(animal) > -1;
  }

  private findMultiSelectedAnimalIndex(animal): number {
    return this.multiSelectedAnimals.findIndex(
      (multiAnimal) => multiAnimal.tagNumber === animal.tagNumber
    );
  }

  private getAnimal(tagNumber: string): Observable<IAnimal> {
    return this.store.pipe(select(getAnimalByTag(tagNumber)));
  }

  private getBull(tagNumber: string): Observable<IBull> {
    return this.store.select(selectBullByTag(tagNumber));
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

  private trackSort(): void {
    // this.searchedAnimals$ = combineLatest([this.sortOldToYoung, this.sortYoungToOld, this.searchedAnimals$]).pipe(map(([oldToYoung, youngToOld, animals]) => animals))
  }

  private trackSearch() {
    // this.animals$ = combineLatest([this.animals$, this.includeSoldAnimalsFormControl.valueChanges]).pipe(map(([animals, includeSold]) => {
    //   return animals.filter(animal => (isAnimal(animal) && (!!animal.salePrice === includeSold)))
    // }))
    this.subscriptions.add(
      this.animals$
        .pipe(takeWhile(() => !this.searched, true))
        .subscribe((animals) => this.searchedAnimals$.next(animals))
    );
    this.subscriptions.add(
      combineLatest([this.searchBarValChange, this.animals$]).subscribe(
        ([value, animals]: [string, Animal[]]) => {
          this.searched = true;
          if (value.length > 1) {
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
        animal.name?.toLowerCase().includes(value.toLowerCase()) ||
        (isAnimal(animal) &&
          animal.managementTag.toLowerCase().includes(value.toLowerCase()))
    );
  }

  private get searchBarValChange() {
    return this.searchBarGroup.get('searchBar').valueChanges;
  }

  private get includeSoldAnimalsValue() {
    return this.includeSoldAnimalsFormControl.value;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
