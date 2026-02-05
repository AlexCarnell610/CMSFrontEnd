import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'cms-yes-no-check',
    templateUrl: './yes-no-check.component.html',
    styleUrls: ['./yes-no-check.component.scss'],
    standalone: false
})
export class YesNoCheckComponent {

  @Input()yesNoFormControl: FormControl;
  @Input()name: string;
  @Input()yesVal = "yes";
  @Input()noVal = 'no';

  

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
