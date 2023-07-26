import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { IAnimal } from '@cms-interfaces';
import { ScreenSizeService } from '@cms-services';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'cms-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})
export class WeightComponent implements OnInit, OnDestroy {
  public chartWeights: ChartDataSets[] = [];
  public chartLabels: Label[];
  public chartOptions = { maintainAspectRatio: false, responsive: true, scales: { yAxes: [{
    beginAtZero: true,
    ticks:{min: 0, suggestedMax: 1000, stepSize: 50}
  }] } };
  public chartType = 'line';
  public chartPlugins = [];
  public showLegend = false;
  public selectedAnimal: IAnimal;
  public $selectedAnimal: BehaviorSubject<IAnimal> = new BehaviorSubject(null);
  public isAddMode = false;
  public pageName = PageURLs.Weight;
  private subs = new Subscription();

  constructor(
    private readonly modalService: NgxSmartModalService,
    private readonly router: Router,
    public readonly screenSize: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.updateGraph();
  }

  public animalSelected(event) {
    this.$selectedAnimal.next(event);
  }

  public openAddModal() {
    this.isAddMode = true;
    this.modalService.get(Modals.Weight).open();
  }

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public openEditModal() {
    this.isAddMode = false;
    this.modalService.get(Modals.Weight).open();
  }

  public bulkAddWeight(): void {
    this.modalService.get(Modals.BulkWeightModal).open();
  }

  public openEditAnimalModal():void {
    const modal = this.modalService.get(Modals.Animal)
    modal.setData({ isAdd: false, persistData: true });
      modal.open();
  }

  private updateGraph() {
    this.$selectedAnimal.subscribe((animal) => {
      if (
        animal &&
        (this.selectedAnimal !== animal || this.chartWeights.length == 0)
      ) {
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
      } else if (animal == undefined) {
        this.chartWeights = [];
      }
    });
  }

  get dailyWeightGain() {
    const weights = this.selectedAnimal?.weightData;
    if (weights?.length > 1) {
      const initialWeight = weights[0];
      const lastWeight = weights[weights.length - 1];
      const weightGain = lastWeight.weight - initialWeight.weight;
      const dateDiff = lastWeight.weightDate.diff(
        initialWeight.weightDate,
        'days'
      );

      return (weightGain / dateDiff).toPrecision(3);
    }
    return '-';
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
