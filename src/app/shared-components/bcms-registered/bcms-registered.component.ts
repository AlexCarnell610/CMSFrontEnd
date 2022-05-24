import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BirthModalFormControls } from '../../components/modals/birth-modal/birth-modal.component';

@Component({
  selector: 'cms-bcms-registered',
  templateUrl: './bcms-registered.component.html',
  styleUrls: ['./bcms-registered.component.scss']
})
export class BcmsRegisteredComponent implements OnInit {

  @Input() form: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  // public getCSSForRegisteredNo() {
  //   if (this.registered.invalid && this.registered.dirty) {
  //     return 'btn-outline-danger';
  //   } else if (this.registered.value === 'no') {
  //     return 'active';
  //   }
  // }

  // public getCSSForRegisteredYes() {
  //   if (this.registered.invalid && this.registered.dirty) {
  //     return 'btn-outline-danger';
  //   } else if (this.registered.value === 'yes') {
  //     return 'active';
  //   }
  // }

  public get registered() {
    return this.form.get(BirthModalFormControls.Registered);
  }

}
