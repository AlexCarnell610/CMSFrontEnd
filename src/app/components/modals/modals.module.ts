import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbDropdownModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AnimalModalComponent } from './animal-modal/animal-modal.component';
import { BirthModalComponent } from './birth-modal/birth-modal.component';
import { CalvingStatsModalComponent } from './calving-stats-modal/calving-stats-modal.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { TreatmentModalComponent } from './treatment-modal/treatment-modal.component';
import { WarningDisplayComponent } from './warning-display/warning-display.component';
import { EditWeightModalComponent } from './weight-modal/weight-modal.component';

const MODALS = [
  FormErrorsComponent,
  EditWeightModalComponent,
  AnimalModalComponent,
  BirthModalComponent,
  CalvingStatsModalComponent,
  WarningDisplayComponent,
  TreatmentModalComponent,
];

@NgModule({
  declarations: [...MODALS],
  imports: [
    CommonModule,
    NgxSmartModalModule.forChild(),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPopoverModule,
    NgbDropdownModule,
  ],
  exports: [...MODALS, CommonModule, NgxSmartModalModule],
})
export class ModalsModule {}
