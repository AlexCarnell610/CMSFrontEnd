import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbDropdownModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { AnimalModalComponent } from './animal-modal/animal-modal.component';
import { BirthModalComponent } from './birth-modal/birth-modal.component';
import { CalvingStatsModalComponent } from './calving-stats-modal/calving-stats-modal.component';
import { TreatmentModalComponent } from './treatment-modal/treatment-modal.component';
import { WarningDisplayComponent } from './warning-display/warning-display.component';
import { EditWeightModalComponent } from './weight-modal/weight-modal.component';

const MODALS = [
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
    NgSelectModule,
    FormsModule,
    NgxSmartModalModule.forChild(),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPopoverModule,
    NgbDropdownModule,
    SharedComponentsModule
  ],
  exports: [...MODALS, CommonModule, NgxSmartModalModule],
})
export class ModalsModule {}
