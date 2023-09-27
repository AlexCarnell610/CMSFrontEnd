import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { IAnimal, ICullUpdate } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getAnimalByTag, getCalves } from '@cms-ngrx/animal';
import {
  CullUpdateService,
  LoadingPaneService,
  ScreenSizeService,
} from '@cms-services';
import { select, Store } from '@ngrx/store';
import { ChartConfiguration } from 'chart.js';
import { Moment } from 'moment';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cms-cull-update',
  templateUrl: './cull-update.component.html',
  styleUrls: ['./cull-update.component.scss'],
})
export class CullUpdateComponent implements OnInit, OnDestroy {
  public cullUpdate: ICullUpdate[] = null;
  public $selectedAnimal: BehaviorSubject<IAnimal> = new BehaviorSubject(null);
  public $calves: BehaviorSubject<IAnimal[]> = new BehaviorSubject(null);
  public selectedCullUpdate: ICullUpdate;
  public chartWeights: ChartConfiguration['data'];
  public aliveVSDeadData: ChartConfiguration['data'];
  public weightChartOptions: ChartConfiguration['options'];
  public aliveDeadChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public showLegend = false;
  public isSmallScreen = false;

  private subs: Subscription = new Subscription();
  constructor(
    private readonly cullUpdateService: CullUpdateService,
    private readonly router: Router,
    private readonly store: Store<RootState>,
    private readonly screenSizeService: ScreenSizeService,
    private readonly loadingService: LoadingPaneService
  ) {}

  ngOnInit(): void {
    this.loadingService.cullUpdateLoading.subscribe((loading) => {
      this.loadingService.setLoadingState(loading);
    });
    this.setUpChartOptions();
    this.updateGraph();
    this.cullUpdateService.getCullUpdate().subscribe((cullUpdate) => {
      this.cullUpdate = cullUpdate;
    });
    this.subs.add(
      this.screenSizeService.isSmallScreenObs().subscribe((isSmall) => {
        this.isSmallScreen = isSmall;
      })
    );
  }

  public animalSelected(event: ICullUpdate) {
    this.selectedCullUpdate = event;
    this.subs.add(
      this.store
        .pipe(select(getAnimalByTag(event.tagNumber)), take(1))
        .subscribe((animal) => {
          if (this.$selectedAnimal.getValue()?.tagNumber !== animal.tagNumber) {
            this.$selectedAnimal.next(animal);
            this.store
              .pipe(select(getCalves(event.tagNumber)), take(1))
              .subscribe((calves) => {
                this.$calves.next(calves);
              });
          }
        })
    );
  }

  public backToMenu() {
    this.router.navigate([PageURLs.MainMenu, PageURLs.Performance]);
  }

  private updateGraph() {
    this.subs.add(
      combineLatest([this.$calves, this.$selectedAnimal]).subscribe(
        ([calves, animal]) => {
          if (animal) {
            this.aliveVSDeadData = {
              datasets: [
                {
                  data: [
                    this.selectedCullUpdate.aliveCalves,
                    this.selectedCullUpdate.totalCalves -
                      this.selectedCullUpdate.aliveCalves,
                  ],
                  label: 'Calves',
                },
              ],
              labels: ['Number alive calves', 'Number dead calves'],
            };

            this.chartWeights = { datasets: [], labels: [] };
            if (calves?.length > 0) {
              let dates: Moment[] = [];
              calves.forEach((calf) => {
                let chartPoint: any[] = [];
                calf.weightData.forEach((weight) => {
                  dates.push(weight.weightDate);
                  chartPoint.push({
                    x: weight.weightDate.format('L'),
                    y: weight.weight,
                  });
                });

                this.chartWeights.datasets.push({
                  data: chartPoint,
                  label: calf.tagNumber,
                });
              });
              dates.forEach((date) => {
                this.chartWeights.labels.push(date.format('L'));
              });
            }
          }
        }
      )
    );
  }

  private setUpChartOptions() {
    this.weightChartOptions = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            title: (event) => event[0].dataset.label,
            label: (event) => {
              console.warn(event);
              return `${event.formattedValue} Kg`;
            },
          },
        },
      },
    };
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
