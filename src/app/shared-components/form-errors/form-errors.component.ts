import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'cms-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent {
  constructor() {}
  @Input() errors: ValidationErrors;
  @Input() isRadio: boolean = false;
  @Input() isManagementTag=false
  @Input() bulkWeightEdit=false
  @Input() minMaxUnits = "Kg"
}
