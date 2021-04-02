import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { DobValidatorDirective } from './dob-validator.directive';

fdescribe('DobValidatorDirective', () => {
  let directive: DobValidatorDirective, mockControl;

  beforeEach(() => {
    mockControl = {} as AbstractControl;
    directive = new DobValidatorDirective();
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('shoudl return warning if date in the future', () => {
    mockControl = { value: moment().add(2, 'days') };
    expect(directive.validate(mockControl)).toEqual({
      dob: 'DOB cant be in the future',
    });
  });

  it('shoudl return null if dat not in the future', () => {
    mockControl = { value: moment() };
    expect(directive.validate(mockControl)).toBeNull();
  });
});
