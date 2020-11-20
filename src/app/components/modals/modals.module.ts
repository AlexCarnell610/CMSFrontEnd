import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { EditWeightModalComponent } from './edit-weight-modal/edit-weight-modal.component';



@NgModule({
  declarations: [EditWeightModalComponent],
  imports: [
    CommonModule,
    NgxSmartModalModule.forChild()
  ],
  exports:[
    EditWeightModalComponent, CommonModule, NgxSmartModalModule
  ]
})
export class ModalsModule { }
