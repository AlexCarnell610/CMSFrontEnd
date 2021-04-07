import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'cms-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.css'],
})
export class FormErrorsComponent {
  constructor() {}
  @Input() errors: ValidationErrors;
  @Input() isRadio: boolean = false;
}
