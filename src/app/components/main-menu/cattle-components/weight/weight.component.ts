import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
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
  public chartOptions = { responsive: true };
  public chartType = 'line';
  public chartPlugins = [];
  public showLegend = false;
  public selectedAnimal: Animal;
  public $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
