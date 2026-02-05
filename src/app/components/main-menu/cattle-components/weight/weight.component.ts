import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { IAnimal } from '@cms-interfaces';
import { PerformanceService, ScreenSizeService } from '@cms-services';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
    selector: 'cms-weight',
    templateUrl: './weight.component.html',
    styleUrls: ['./weight.component.scss'],
    standalone: false
})
export class WeightComponent implements OnInit, OnDestroy {
  public chartWeights: ChartConfiguration['data'];
  public chartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (label) =>
            `${label.dataset.label}: ${label.formattedValue} Kg`,
        },
      },
    },
    elements: { line: { tension: 0.3 } },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        suggestedMax: 1000,
        ticks: { stepSize: 50 },
      },
    },
  };
  public chartType: ChartType = 'line';
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
    public readonly screenSize: ScreenSizeService,
    private readonly perfService: PerformanceService
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

  public openEditAnimalModal(): void {
    const modal = this.modalService.get(Modals.Animal);
    modal.setData({ isAdd: false, persistData: true });
    modal.open();
  }

  private updateGraph() {
    this.$selectedAnimal.subscribe((animal) => {
      if (animal && (this.selectedAnimal !== animal || !this.chartWeights)) {
        this.selectedAnimal = animal;
        this.chartWeights = {
          datasets: [
            {
              data: animal.weightData.map((weight) => weight.weight),
              label: animal.tagNumber,
            },
          ],
          labels: animal.weightData.map((weight) =>
            weight.weightDate.format('L')
          ),
        };
      } else if (animal == undefined) {
        this.chartWeights = null;
      }
    });
  }

  get dailyWeightGain() {
    if (this.selectedAnimal?.weightData.length > 1) {
      
      return (this.perfService.calculateAvgDailyWeightGain(this.selectedAnimal)).toPrecision(3)
    }else{
      return '-'
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
