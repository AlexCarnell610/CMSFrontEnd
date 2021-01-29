import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { RootState, selectAll } from '@cms-ngrx/reducers';
import { ScreenSizeService } from '@cms-services';
import { select, Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

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
    private readonly store: Store<RootState>,
    private readonly fb: FormBuilder,
    private readonly modalService: NgxSmartModalService,
    private readonly router: Router,
    public readonly screenSize: ScreenSizeService
  ) {}

  public animals$: Observable<Animal[]>;
  public searchedAnimals$: BehaviorSubject<Animal[]> = new BehaviorSubject([]);
  public selectedAnimal: Animal;
  public $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  public isAddMode = false;

  ngOnInit(): void {
    // this.store.dispatch(new RetrieveAnimalData());
    this.searchBarGroup = this.fb.group({ searchBar: this.fb.control([]) });
    this.animals$ = this.store.pipe(select(selectAll));
    this.trackSearch();
    this.updateGraph();
    this.searchBarGroup.get('searchBar').setValue('');
  }

  public openAddModal(){
    this.isAddMode = true;
    this.modalService.get(Modals.Weight).open();
  }

  private updateGraph() {  
    this.$selectedAnimal.subscribe(animal => {

      if (animal) {
        this.selectedAnimal = animal
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
    })
    }

  public selectAnimal(selectedAnimal: Animal) {
    if (selectedAnimal.tagNumber !== this.$selectedAnimal.getValue()?.tagNumber) {
      this.searchedAnimals$.subscribe(animals => this.$selectedAnimal.next(animals.find(animal => animal.tagNumber == selectedAnimal.tagNumber)));
    }
  }

  private get searchBarValChange (){
    return this.searchBarGroup.get('searchBar').valueChanges
  }

  private getSearchedAnimals(animals: Animal[],  value: string): Animal[]{
    return animals.filter(animal => animal.tagNumber.toLowerCase().includes(value.toLowerCase()))
  }

  private trackSearch() {
    combineLatest([this.searchBarValChange, this.animals$, this.screenSize.isSmallScreenObs()]).subscribe(([value, animals, isSmall]: [string, Animal[], boolean]) => {
      if(value.length > 2){
        this.searchedAnimals$.next(isSmall ? this.getSearchedAnimals(animals, value).slice(0,5) : this.getSearchedAnimals(animals, value))
      } else {
        this.searchedAnimals$.next(isSmall ? animals.slice(0,5) : animals);
      }
    })
  }

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public edit() {
    this.isAddMode = false;
    this.modalService.getModal(Modals.Weight).open();
  }
}
