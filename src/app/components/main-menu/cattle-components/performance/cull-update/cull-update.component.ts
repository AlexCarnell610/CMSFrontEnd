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
import { ChartConfiguration, ChartOptions } from 'chart.js';
import moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
    selector: 'cms-cull-update',
    templateUrl: './cull-update.component.html',
    styleUrls: ['./cull-update.component.scss'],
    standalone: false
})
export class CullUpdateComponent implements OnInit, OnDestroy {
  public cullUpdate: ICullUpdate[] = null;
  public $selectedAnimal: BehaviorSubject<IAnimal> = new BehaviorSubject(null);
  public $calves: BehaviorSubject<IAnimal[]> = new BehaviorSubject(null);
  public selectedCullUpdate: ICullUpdate;
  public chartWeights$: Observable<ChartConfiguration['data']>;
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
    this.weightGainWeights();
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
    this.updateAliveVDeadGraph();
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

  private weightGainWeights(): void {
    this.chartWeights$ = combineLatest([
      this.$calves,
      this.$selectedAnimal,
    ]).pipe(
      map(([calves, selectedAnimal]) => {
        const data: ChartConfiguration['data'] = { datasets: [], labels: [] };
        if (selectedAnimal && calves) {
          data.datasets = calves.map((calf) => {
            return {
              data: calf.weightData.map((weight) => {
                return {
                  y: weight.weight,
                  x: weight.weightDate.valueOf(),
                  r: 1,
                };
              }),
              label: calf.tagNumber,
            };
          });
          data.labels = this.createLabels(calves);
        }
        return data;
      })
    );
  }

  private updateAliveVDeadGraph(): void {
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

    // this.subs.add(
    //   combineLatest([this.$calves, this.$selectedAnimal]).subscribe(
    //     ([calves, animal]) => {
    //       if (animal) {
    //         this.aliveVSDeadData = {
    //           datasets: [
    //             {
    //               data: [
    //                 this.selectedCullUpdate.aliveCalves,
    //                 this.selectedCullUpdate.totalCalves -
    //                   this.selectedCullUpdate.aliveCalves,
    //               ],
    //               label: 'Calves',
    //             },
    //           ],
    //           labels: ['Number alive calves', 'Number dead calves'],
    //         };

    // this.chartWeights = { datasets: [], labels: [] };
    // if (calves?.length > 0) {
    //   const data: ChartConfiguration['data'] = {
    //     datasets: calves.map((calf) => {
    //       return {
    //         data: calf.weightData.map((weight) => {
    //           return {
    //             y: weight.weight,
    //             x: weight.weightDate.valueOf(),
    //             r: 1,
    //           };
    //         }),
    //         label: calf.tagNumber,
    //       };
    //     }),
    //     labels: this.createLabels(calves),
    //   };

    //           // let dates: Moment[] = [];
    //           // calves.forEach((calf) => {
    //           //   let chartPoint: any[] = [];
    //           //   return {
    //           //     data: calf.weightData.map((weight) => {
    //           //       return {
    //           //         y: weight.weight,
    //           //         x: weight.weightDate.valueOf(),
    //           //         r: 1,
    //           //       };
    //           //     }),
    //           //     label: calf.tagNumber,
    //           //   };
    //           // calf.weightData.forEach((weight) => {
    //           //   dates.push(weight.weightDate);
    //           //   chartPoint.push({
    //           //     x: weight.weightDate.format('L'),
    //           //     y: weight.weight,
    //           //   });
    //           // });

    //           // this.chartWeights.datasets.push({
    //           //   data: chartPoint,
    //           //   label: calf.tagNumber,
    //           // });
    //           // });
    //           // dates.forEach((date) => {
    //           //   this.chartWeights.labels.push(date.format('L'));
    //           // });
    //         }
    //       }
    //     }
    //   )
    // );
  }

  createLabels(animals: IAnimal[]): number[] {
    const arrayOfArrayOfWeightDates: number[][] = animals.map((animal) =>
      animal.weightData.map((weight) => weight.weightDate.valueOf())
    );

    const arrayOfWeightDates: number[] = arrayOfArrayOfWeightDates.flat();
    const arrayOfUniqueWeightDates: number[] = arrayOfWeightDates.reduce(
      (accum, curVal) => {
        if (!accum.includes(curVal)) {
          accum.push(curVal);
        }
        return accum;
      },
      []
    );

    arrayOfUniqueWeightDates.sort((a, b) => (a < b ? -1 : 1));

    return arrayOfUniqueWeightDates;
  }

  private setUpChartOptions() {
    this.weightChartOptions = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            title: (event) => event[0].dataset.label,
            label: (event) => {
              return `${event.formattedValue} Kg`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          ticks: { stepSize: 50 },
        },
        x: {
          ticks: {
            autoSkip: false,
            callback: function (_, index) {
              return moment(this.getLabelForValue(index)).format('L');
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
