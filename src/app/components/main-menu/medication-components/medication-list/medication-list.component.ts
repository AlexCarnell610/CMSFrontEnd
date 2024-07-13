import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IMedication, MedDisplayDataType } from '@cms-interfaces';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cms-medication-list',
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.scss'],
})
export class MedicationListComponent implements OnInit {
  @Output()editEmit:EventEmitter<MedDisplayDataType> = new EventEmitter()
  public searchBarGroup = new FormGroup<{
    searchBar: FormControl<string>;
  }>({
    searchBar: new FormControl(null),
  });

  @Input() data$: Observable<IMedication[]>;
  public searchedData$: BehaviorSubject<IMedication[]> = new BehaviorSubject(
    []
  );

  constructor() {}

  ngOnInit(): void {
    this.data$.subscribe((data) => this.searchedData$.next(data));
    this.listenToSearchBar();
  }

  private listenToSearchBar(): void {
    combineLatest([
      this.searchBarGroup.controls.searchBar.valueChanges,
      this.data$,
    ]).subscribe(([searchTerm, data]: [string, IMedication[]]) => {
      if (searchTerm.length > 2) {
        this.searchedData$.next(
          data.filter((medication) => medication.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }else{
        this.searchedData$.next(data)
      }
    });
  }

  edit(datum:MedDisplayDataType):void{
    this.editEmit.emit(datum)
  }
}
