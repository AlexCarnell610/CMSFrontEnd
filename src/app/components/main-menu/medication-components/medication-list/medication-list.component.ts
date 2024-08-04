import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  IMedication,
  ITreatment,
  MedDisplayDataType,
  isMedication,
  isMedicationArray,
} from '@cms-interfaces';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cms-medication-list',
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.scss'],
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

  constructor() {}

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
              const newItem = {...item, date: item.treatmentDate.format('DD/MM/YYYY')}
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
