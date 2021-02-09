import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function yes() {
  return 'ok';
}

export const selectValidator: ValidatorFn = (control: FormControl) => {
  if (control.value !== 'invalid') {
    return null;
  } else {
    return {
      select: 'Select a value',
    };
  }
};

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (moment().diff(moment(control.value), 'days', true) < 0) {
      return { date: true };
    } else {
      return null;
    }
  };
}
