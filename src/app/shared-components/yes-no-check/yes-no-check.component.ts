import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cms-yes-no-check',
  templateUrl: './yes-no-check.component.html',
  styleUrls: ['./yes-no-check.component.scss']
})
export class BcmsRegisteredComponent {

  @Input()yesNoFormControl: FormControl

  public getCSSForNo() {
    if (this.yesNoFormControl.invalid && this.yesNoFormControl.dirty) {
      return 'btn-outline-danger';
    } else if (this.yesNoFormControl.value === 'no') {
      return 'active';
    }
  }

  public getCSSForYes() {
    if (this.yesNoFormControl.invalid && this.yesNoFormControl.dirty) {
      return 'btn-outline-danger';
    } else if (this.yesNoFormControl.value === 'yes') {
      return 'active';
    }
  }
}
