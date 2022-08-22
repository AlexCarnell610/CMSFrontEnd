import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { Animal, ICullUpdate } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getAnimalByTag, getCalves } from '@cms-ngrx/animal';
import { CullUpdateService, LoadingPaneService, ScreenSizeService } from '@cms-services';
import { select, Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Moment } from 'moment';
import { Label } from 'ng2-charts';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cms-cull-update',
  templateUrl: './cull-update.component.html',
  styleUrls: ['./cull-update.component.scss'],
})
export class CullUpdateComponent implements OnInit, OnDestroy {
  public cullUpdate: ICullUpdate[] = null;
  public $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  public $calves: BehaviorSubject<Animal[]> = new BehaviorSubject(null);
  public selectedCullUpdate: ICullUpdate;
  public chartWeights: ChartDataSets[] = [];
  public aliveVSDeadData: ChartDataSets[] = [];
  public aliveVSDeadLabels: Label[];
  public chartLabels: Label[];
  public weightChartOptions: ChartOptions;
  public aliveDeadChartOptions: ChartOptions = { responsive: true };
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
    this.loadingService.cullUpdateLoading.subscribe(loading => {
      this.loadingService.setLoadingState(loading)
    })
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

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  private updateGraph() {
    this.subs.add(
      combineLatest([this.$calves, this.$selectedAnimal]).subscribe(
        ([calves, animal]) => {
          if (animal) {
            this.aliveVSDeadData = [
              {
                data: [
                  this.selectedCullUpdate.aliveCalves,
                  this.selectedCullUpdate.totalCalves -
                    this.selectedCullUpdate.aliveCalves,
                ],
                label: 'Calves',
              },
            ];

            this.aliveVSDeadLabels = [
              'Number alive calves',
              'Number dead calves',
            ];
            this.chartWeights = [];
            this.chartLabels = [];
            if (calves?.length > 0) {
              let dates: Moment[] = [];
              calves.forEach((calf) => {
                let chartPoint: ChartPoint[] = [];
                calf.weightData.forEach((weight) => {
                  dates.push(weight.weightDate);
                  chartPoint.push({
                    x: weight.weightDate.format('L'),
                    y: weight.weight,
                  });
                });

                this.chartWeights.push({
                  data: chartPoint,
                  label: calf.tagNumber,
                });
              });
              dates.forEach((date) => {
                this.chartLabels.push(date.format('L'));
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
      tooltips: {
        custom: (toolTip) => {
          if (toolTip.title) {
            toolTip.title = [toolTip.body[0].lines[0].substring(0, 14)];
            toolTip.body[0].lines[0] =
              toolTip.body[0].lines[0].substring(16) + ' Kg';
          }
          return toolTip;
        },
      },
    };
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
