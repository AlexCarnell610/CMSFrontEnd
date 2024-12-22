import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
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
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
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
  page = PageURLs.WeightAnalysis;
  dateFilterDob = true;
  hoveredDate: NgbDate | null = null;
  performanceForm: UntypedFormGroup;
  maxDate: NgbDateStruct;
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
      title: {
        display: true,
        text: 'Weight Gain',
        fullSize: true,
        font: {
          size: 16,
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
        ticks: { stepSize: 50 },
      },
      x: {
        ticks: {
          callback: function (_, index) {
            return moment(this.getLabelForValue(index)).format('L');
          },
        },
      },
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
          label: (label) => `${label.label}: ${label.formattedValue} Kg/day`,
          title: () => '',
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
    this.actualDailyWeightChartData$ = this.selectedAnimals$.pipe(
      map((selectedAnimals) => {
        const filteredAnimals = selectedAnimals.filter(
          (animal) => isAnimal(animal) && animal.weightData.length > 1
        );
        if (isAnimalArray(filteredAnimals)) {
          const data: ChartConfiguration['data'] = {
            datasets: filteredAnimals.map((animal) => {
              return {
                data: animal.weightData.map((weight) => {
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
        const filteredAnimals = selectedAnimals?.filter(
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
    const animals$ = this.store.select(selectAnimals).pipe(
      filter((animals) => animals.length > 0),
      map((animals) =>
        [...animals].sort((animalA, animalB) =>
          animalA.birthDate.isSameOrBefore(animalB.birthDate) ? -1 : 1
        )
      )
    );

    this.minDate$ = animals$.pipe(
      map((animals) => this.toNgbDateStruct(animals[0].birthDate))
    );

    this.maxDate = this.toNgbDateStruct(moment());

    this.performanceForm = new UntypedFormGroup({
      startDate: new UntypedFormControl(null, Validators.required),
      endDate: new UntypedFormControl(null, Validators.required),
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

    arrayOfUniqueWeightDates.sort((a, b) => (a < b ? -1 : 1));

    return arrayOfUniqueWeightDates;
  }

  triggerDateChange(): void {
    this.fromDateControl.updateValueAndValidity();
    this.toDateControl.updateValueAndValidity();
  }

  get dateRange(): Observable<IDobRange> {
    return zip(
      this.fromDateControl.valueChanges.pipe(filter((val) => val !== null)),
      this.toDateControl.valueChanges.pipe(filter((val) => val !== null))
    ).pipe(
      map((range: [NgbDate, NgbDate]) => {
        return { from: this.toMoment(range[0]), to: this.toMoment(range[1]) };
      })
    );
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

    if (input === '') {
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
      ? moment().year(date.year).month(date.month -1).date(date.day)
      : undefined;
  }

  private toNgbDateStruct(date: moment.Moment): NgbDateStruct {
    return {
      day: date.date(),
      month: date.month() +1,
      year: date.year(),
    };
  }
}
