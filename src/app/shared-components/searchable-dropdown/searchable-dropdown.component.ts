import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IMedication } from '@cms-interfaces';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { OperatorFunction, Observable, merge, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';

@Component({
  selector: 'cms-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss'],
})
export class SearchableDropdownComponent {
  @Input() isRequired = true;
  @Input() inputFormControl: FormControl;
  @Input() data: IMedication[];
  @Input() label: string;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  selected;

  constructor() {}

  get dataSorted(): { medication: IMedication; expired: string }[] {
    return this.data.map((datum) => {
      return {
        medication: datum,
        expired: datum.expiryDate.isBefore(moment()) ? 'Expired' : 'In Date',
      };
    });
  }

  isExpired(medication: IMedication): boolean {
    return medication.expiryDate.isBefore(moment());
  }

  select($event) {
    this.inputFormControl.setValue($event.item.medication);
  }

  search: OperatorFunction<string, readonly IMedication[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => {
        const lcTerm = term.toLowerCase()
        return (
          term === ''
            ? this.data
            : this.data.filter(
                (v) => v.name.toLowerCase().indexOf(lcTerm) > -1 || v.batchNumber.toLowerCase().indexOf(lcTerm) > -1
              )
        ).slice(0, 10);
      })
    );
  };

  formatter = (x: { name: string; batchNumber: string }) =>
    x.name;
}
