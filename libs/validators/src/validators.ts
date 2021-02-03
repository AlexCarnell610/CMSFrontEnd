import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import * as moment from 'moment';

export function yes(){
    return "ok";
}

export const selectValidator: ValidatorFn = (control: FormControl) => {
    if (control.value !== 'invalid') {
        console.error("VALIDATOR VALID");
        
        return null;
    } else {
        console.error("VALIDATOR INVALID");
        return {
            select: "Select a value"
        }
    }
}

export function dateValidator(): ValidatorFn {
    console.warn("CALLED");
    
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (moment().diff(moment(control.value), 'days',true) < 0) {
        return {date: true};
      } else {
        return null;
      }
    };
  }