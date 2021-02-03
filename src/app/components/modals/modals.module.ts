import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AnimalModalComponent } from './animal-modal/animal-modal.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { EditWeightModalComponent } from './weight-modal/weight-modal.component';

const MODALS = [EditWeightModalComponent,AnimalModalComponent, FormErrorsComponent]

@NgModule({
  declarations: [...MODALS],
  imports: [
    CommonModule,
    NgxSmartModalModule.forChild(),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPopoverModule
  ],
  exports:[
    ...MODALS, CommonModule, NgxSmartModalModule
  ],
})
export class ModalsModule { }
