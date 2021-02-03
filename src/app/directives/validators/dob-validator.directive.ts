import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[cmsDobValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DobValidatorDirective, multi: true}]
})
export class DobValidatorDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    console.warn("CALLED");
    
      if (moment().diff(moment(control.value), 'days') < 0) {
        return { dob: 'DOB cant be in the future' };
      } else {
        return null;
      }
  }

  constructor() { }

}
