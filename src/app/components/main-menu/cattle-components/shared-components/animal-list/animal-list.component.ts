import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { RootState, selectAll } from '@cms-ngrx';
import { ScreenSizeService } from '@cms-services';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'cms-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css'],
})
export class AnimalListComponent implements OnInit {
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() animalSelected: EventEmitter<Animal> = new EventEmitter();
  @Input() page: PageURLs;
  public searchBarGroup: FormGroup = new FormGroup({});
  public animals$: Observable<Animal[]>;
  public searchedAnimals$: BehaviorSubject<Animal[]> = new BehaviorSubject([]);
  public $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  public pillButtonText: string;

  private currentAnimal: Animal = null;
  private currentIndex: number;
  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<RootState>,
    private readonly screenSize: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.searchBarGroup = this.fb.group({ searchBar: this.fb.control([]) });
    this.searchBarGroup.get('searchBar').setValue('');
    this.animals$ = this.store.pipe(select(selectAll));
    this.trackSearch();
    this.searchBarGroup.get('searchBar').setValue('');
    this.pillButtonText = this.getPillButtonText();
    this.animals$.subscribe((ani) => {
      console.warn('animals', ani);
    });
  }

  public openAddModal() {
    this.add.emit(null);
  }

  public openEditModal() {
    this.edit.emit(null);
  }

  public selectAnimal(index: number) {
    console.warn('hello');

    if (this.getAnimal(index).tagNumber !== this.currentAnimal?.tagNumber) {
      this.currentAnimal = this.getAnimal(index);
      this.currentIndex = index;
      this.animalSelected.emit(this.getAnimal(index));
    }
  }

  private getPillButtonText(): string {
    switch (this.page) {
      case PageURLs.Weight:
        return 'Weights';
      default:
        return '';
    }
  }

  private trackSearch() {
    combineLatest([
      this.searchBarValChange,
      this.animals$,
      this.screenSize.isSmallScreenObs(),
    ]).subscribe(([value, animals, isSmall]: [string, Animal[], boolean]) => {
      if (value.length > 2) {
        this.searchedAnimals$.next(
          isSmall
            ? this.getSearchedAnimals(animals, value).slice(0, 5)
            : this.getSearchedAnimals(animals, value)
        );
        this.animalSelected.emit(this.getAnimal(this.currentIndex));
      } else {
        this.searchedAnimals$.next(isSmall ? animals.slice(0, 5) : animals);
        this.animalSelected.emit(this.getAnimal(this.currentIndex));
      }
    });
  }

  private getSearchedAnimals(animals: Animal[], value: string): Animal[] {
    return animals.filter((animal) =>
      animal.tagNumber.toLowerCase().includes(value.toLowerCase())
    );
  }

  private get searchBarValChange() {
    return this.searchBarGroup.get('searchBar').valueChanges;
  }

  private getAnimal(index: number) {
    return this.searchedAnimals$.value[index];
  }
}