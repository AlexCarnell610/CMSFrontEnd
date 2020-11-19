import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Animal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx/reducers';
import { select, Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { selectAll } from 'libs/ngrx/src/lib/reducers/src/animals.reducer';
import { Label } from 'ng2-charts';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cms-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css'],
})
export class WeightComponent implements OnInit {
  public chartWeights: ChartDataSets[] = [];
  public chartLabels: Label[];
  public chartOptions = { responsive: true };
  public chartType = 'line';
  public chartPlugins = [];
  public showLegend = false;

  public searchBarGroup: FormGroup = new FormGroup({});

  constructor(
    private store: Store<RootState>,
    private readonly fb: FormBuilder
  ) {}

  public animals$: Observable<Animal[]>;
  public searchedAnimals$: BehaviorSubject<Animal[]> = new BehaviorSubject([]);
  public selectedAnimal: Animal;

  ngOnInit(): void {
    this.searchBarGroup = this.fb.group({ searchBar: this.fb.control([]) });
    this.animals$ = this.store.pipe(select(selectAll));
    this.trackSearch();
  }

  public selectAnimal(animal: Animal) {    
    if (animal !== this.selectedAnimal) {
      this.selectedAnimal = animal;
      this.chartWeights = [
        {
          data: animal.weightData.map((weight) => weight.weight),
          label: animal.tagNumber,
        },
      ];
      this.chartLabels = animal.weightData.map((weight) =>
        weight.weightDate.format('L')
      );
    }
  }

  private get searchBarValChange (){
    return this.searchBarGroup.get('searchBar').valueChanges
  }

  private trackSearch() {
    // this.animals$.pipe(take(1)).subscribe(animals => this.searchedAnimals$.next(animals.slice(0,5)))
    combineLatest([this.searchBarValChange, this.animals$]).subscribe(([value, animals]: [string, Animal[]]) => {
      if(value.length > 2){
        this.searchedAnimals$.next(animals.filter(animal => animal.tagNumber.toLowerCase().includes(value.toLowerCase())))
      } else {
        this.searchedAnimals$.next([]);
      }
    })
  }

  public showAll(){
    this.animals$.pipe(take(1)).subscribe(animals => this.searchedAnimals$.next(animals))
  }

  public edit(animal: Animal, index: number) {}
}
