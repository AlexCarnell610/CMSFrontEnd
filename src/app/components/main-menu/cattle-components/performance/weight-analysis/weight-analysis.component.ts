import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';
import {
  Animal,
  IAnimal,
  IDobRange,
  isAnimal,
  isAnimalArray,
} from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectAnimals } from '@cms-ngrx/animal';
import { PerformanceService } from '@cms-services';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { CategoryScale, Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import * as moment from 'moment';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cms-weight-analysis',
  templateUrl: './weight-analysis.component.html',
  styleUrls: ['./weight-analysis.component.scss'],
})
export class WeightAnalysisComponent implements OnInit {
  @ViewChild('datepicker') datePicker: NgbInputDatepicker;
  hoveredDate: NgbDate | null = null;
  performanceForm: FormGroup;
  maxDate$: Observable<NgbDateStruct>;
  minDate$: Observable<NgbDateStruct>;
  averageWeightsChart: ChartData<'bar'>;
  barChartType: ChartType = 'bar';
  lineChartType: ChartType = 'line';
  actualDailyWeightChartData$: Observable<ChartConfiguration['data']>;
  actualDailyWeightOptions: ChartConfiguration['options'] = {
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
      x: {
       ticks: {
        callback: function(value, index, ticks) {
          console.warn()
          return moment(this.getLabelForValue(index)).format('L')
      }
       }
      }
    },
  };
  avgDailyWeightChartData: Observable<ChartConfiguration['data']>;
  avgDailyWeightGainChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (label) =>
            `${label.dataset.label}: ${label.formattedValue} Kg/day`,
        },
      },
      title: {
        display: true,
        text: 'Average Daily Weight Gain',
        fullSize: true,
        font: {
          size: 16,
        },
      },
    },
    elements: { line: { tension: 0.3 } },
    maintainAspectRatio: false,
    responsive: true,
  };

  private selectedAnimals$: BehaviorSubject<Animal[]> = new BehaviorSubject<
    Animal[]
  >([]);

  constructor(
    private readonly router: Router,
    private readonly calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private readonly store: Store<RootState>,
    private readonly perfService: PerformanceService
  ) {}

  ngOnInit(): void {
    // this.selectedAnimals$.subscribe((animals) => {
    //   const filteredAnimals = animals.filter(
    //     (animal) => isAnimal(animal) && animal.weightData.length > 1
    //   );
    //   if (isAnimalArray(filteredAnimals)) {
    //     const labels = filteredAnimals.map((animal) => animal.tagNumber);
    //     const avgWeightGains = filteredAnimals.map((animal) =>
    //       this.perfService.calculateAvgDailyWeightGain(animal)
    //     );

    //     console.warn({ labels });
    //     console.warn({ avgWeightGains });
    //   }

    // });

    this.actualDailyWeightChartData$ = this.selectedAnimals$.pipe(
      map((selectedAnimals) => {
        console.warn(selectedAnimals);
        const filteredAnimals = selectedAnimals.filter(
          (animal) => isAnimal(animal) && animal.weightData.length > 1
        );
        if (isAnimalArray(filteredAnimals)) {
          const data: ChartConfiguration['data'] = {
            datasets: filteredAnimals.map((animal) => {
              return {
                data: animal.weightData.map((weight) => {
                  console.warn(weight.weightDate.valueOf())
                  return {
                    y: weight.weight,
                    x: weight.weightDate.valueOf(),
                    r: 1,
                  };
                }),
                label: animal.tagNumber,
              };
            }),
            labels: this.createLabels(filteredAnimals),
          };

          return data;
        }
      })
    );

    this.avgDailyWeightChartData = this.selectedAnimals$.pipe(
      map((selectedAnimals) => {
        const filteredAnimals = selectedAnimals.filter(
          (animal) => isAnimal(animal) && animal.weightData.length > 1
        );
        if (isAnimalArray(filteredAnimals)) {
          const labels = filteredAnimals.map((animal) => animal.tagNumber);
          const avgWeightGains = filteredAnimals.map((animal) =>
            this.perfService.calculateAvgDailyWeightGain(animal)
          );
          return {
            datasets: [
              {
                data: avgWeightGains,
              },
            ],
            labels,
          };
        }
      })
    );

    //sort based on highest total weigh, totasl weight gain avg daily weight gain
    const animals$ = this.store.pipe(
      select(selectAnimals),
      filter((animals) => animals.length > 0),
      map((animals) =>
        animals.sort((animalA, animalB) =>
          animalA.birthDate.isSameOrBefore(animalB.birthDate) ? -1 : 1
        )
      )
    );

    this.minDate$ = animals$.pipe(
      map((animals) => this.toNgbDateStruct(animals[0].birthDate))
    );

    this.maxDate$ = animals$.pipe(
      map((animals) => this.toNgbDateStruct(animals.pop().birthDate))
    );

    this.performanceForm = new FormGroup({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    });

    this.fromDateControl.valueChanges.subscribe((val) => {
      console.warn('from', val);
    });
    this.toDateControl.valueChanges.subscribe((val) => {
      console.warn('to', val);
    });
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

    return arrayOfUniqueWeightDates;
  }

  get dobRange(): Observable<IDobRange> {
    return zip(
      this.fromDateControl.valueChanges,
      this.toDateControl.valueChanges.pipe(filter((val) => val !== null))
    ).pipe(
      map((range: [NgbDate, NgbDate]) => {
        console.warn('Range!!!!!', range);

        return { from: this.toMoment(range[0]), to: this.toMoment(range[1]) };
      })
    );
    // return this.fromDateValue && this.toDateValue
    //   ? {
    //       from: this.toMoment(this.fromDateValue),
    //       to: this.toMoment(this.toDateValue),
    //     }
    //   : null;
  }

  clearDateFilter(): void {
    this.fromDateControl.setValue(undefined);
    this.toDateControl.setValue(undefined);
  }

  backToMenu(): void {
    this.router.navigate([PageURLs.MainMenu, PageURLs.Performance]);
  }

  get fromDateControl(): AbstractControl {
    return this.performanceForm.get('startDate');
  }

  get toDateControl(): AbstractControl {
    return this.performanceForm.get('endDate');
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDateValue && !this.toDateValue) {
      this.fromDateValue = date;
    } else if (
      this.fromDateValue &&
      !this.toDateValue &&
      date.after(this.fromDateValue)
    ) {
      this.toDateValue = date;
    } else {
      this.toDateValue = null;
      this.fromDateValue = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDateValue &&
      !this.toDateValue &&
      this.hoveredDate &&
      date.after(this.fromDateValue) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return (
      this.toDateValue &&
      date.after(this.fromDateValue) &&
      date.before(this.toDateValue)
    );
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDateValue) ||
      (this.toDateValue && date.equals(this.toDateValue)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    console.error(parsed, currentValue, input);

    if (input === '') {
      console.warn('Return null');

      return null;
    }
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  toggle(): void {
    this.datePicker.positionTarget = '#datePicker';
    this.datePicker.close();
    this.datePicker.open();
  }

  multiAnimalsSelected(animalsSelected: Animal[]) {
    this.selectedAnimals$.next(animalsSelected);
  }

  get fromDateValue(): NgbDate {
    return this.fromDateControl.value;
  }

  set fromDateValue(date: NgbDate) {
    this.fromDateControl.setValue(date);
  }

  get toDateValue(): NgbDate {
    return this.toDateControl.value;
  }

  set toDateValue(date: NgbDate) {
    this.toDateControl.setValue(date);
  }

  private toMoment(date: NgbDate): moment.Moment | null {
    return date
      ? moment().year(date.year).month(date.month).date(date.day)
      : undefined;
  }

  private toNgbDateStruct(date: moment.Moment): NgbDateStruct {
    return {
      day: date.date(),
      month: date.month(),
      year: date.year(),
    };
  }
}
