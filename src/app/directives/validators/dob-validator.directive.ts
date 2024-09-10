import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[cmsDobValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DobValidatorDirective, multi: true}]
})
export class DobValidatorDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    
      if (moment().diff(moment(control.value), 'days') < 0) {
        return { dob: "DOB can't be in the future" };
      } else {
        return null;
      }
  }

  constructor() { }

}
