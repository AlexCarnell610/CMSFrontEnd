import { Component, Input, OnChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'cms-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.css'],
})
export class FormErrorsComponent implements OnChanges {
  constructor() {}
  @Input() errors: ValidationErrors;
  @Input() isRadio: boolean = false;
  @Input() isDropDown: boolean = false;

  ngOnChanges() {
    console.error(this.errors, this.isDropDown, this.isRadio);
  }
}
