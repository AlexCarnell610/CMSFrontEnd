import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { EditWeightModalComponent } from './edit-weight-modal/edit-weight-modal.component';



@NgModule({
  declarations: [EditWeightModalComponent],
  imports: [
    CommonModule,
    NgxSmartModalModule.forChild(),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPopoverModule
  ],
  exports:[
    EditWeightModalComponent, CommonModule, NgxSmartModalModule
  ]
})
export class ModalsModule { }
