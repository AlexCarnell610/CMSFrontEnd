import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cms-yes-no-toggle',
  templateUrl: './yes-no-toggle.component.html',
  styleUrls: ['./yes-no-toggle.component.scss']
})
export class YesNoToggleComponent implements OnInit {

  @Input() form: FormGroup
  @Input() controlName: string

  constructor() { }

  ngOnInit(): void {
  
  }

  get value():string{    
    return this.formControl.value
  }

  public getCSSForNo() {
    if (this.formControl.invalid && this.formControl.dirty) {
      return 'btn-outline-danger';
    } else if (this.formControl.value === 'no') {
      return 'active';
    }
  }

  public getCSSForYes() {
    if (this.formControl.invalid && this.formControl.dirty) {
      return 'btn-outline-danger';
    } else if (this.formControl.value === 'yes') {
      return 'active';
    }
  }

  public get formControl() {
    return this.form.get(this.controlName);
  }

}
