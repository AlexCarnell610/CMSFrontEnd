import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  IMedication,
  ITreatment,
  MedDisplayDataType,
  isMedicationArray,
  isTreatment,
} from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectMedicationWithdrawal } from '@cms-ngrx/medication';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'cms-medication-list',
    templateUrl: './medication-list.component.html',
    styleUrls: ['./medication-list.component.scss'],
    standalone: false
})
export class MedicationListComponent implements OnInit {
  @Output() editEmit: EventEmitter<MedDisplayDataType> = new EventEmitter();
  public searchBarGroup = new FormGroup<{
    searchBar: FormControl<string>;
  }>({
    searchBar: new FormControl(null),
  });

  @Input() data$: Observable<IMedication[] | ITreatment[]>;
  public searchedData$: BehaviorSubject<IMedication[] | ITreatment[]> =
    new BehaviorSubject([]);

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.data$.subscribe((data) => this.searchedData$.next(data));
    this.listenToSearchBar();
  }

  private listenToSearchBar(): void {
    combineLatest([
      this.searchBarGroup.controls.searchBar.valueChanges,
      this.data$,
    ]).subscribe(
      ([searchTerm, data]: [string, IMedication[] | ITreatment[]]) => {
        if (searchTerm.length > 2) {
          let filteredData = isMedicationArray(data)
            ? data.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : data.filter((item) => {
                const newItem = {
                  ...item,
                  date: item.treatmentStartDate.format('DD/MM/YYYY'),
                };
                return JSON.stringify(newItem)
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              });
          this.searchedData$.next(filteredData);
        } else {
          this.searchedData$.next(data);
        }
      }
    );
  }

  edit(datum: MedDisplayDataType): void {
    this.editEmit.emit(datum);
  }
}
