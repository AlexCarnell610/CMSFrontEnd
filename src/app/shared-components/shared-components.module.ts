import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BcmsRegisteredComponent } from './bcms-registered/bcms-registered.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { HeaderComponent } from './header/header.component';
import { YesNoToggleComponent } from './yes-no-toggle/yes-no-toggle.component';

const COMPONENTS = [HeaderComponent, BcmsRegisteredComponent, FormErrorsComponent, YesNoToggleComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, NgbTooltipModule, ReactiveFormsModule],
  exports: COMPONENTS,
})
export class SharedComponentsModule {}
