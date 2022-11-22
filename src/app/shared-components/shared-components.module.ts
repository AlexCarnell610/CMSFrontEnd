import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedsListComponent } from './breeds-list/breeds-list.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SireListComponent } from './sire-list/sire-list.component';
import { AnimalModalComponent } from './animal-modal/animal-modal.component';
import { BirthModalComponent } from './birth-modal/birth-modal.component';
import { BullModalComponent } from './bull-modal/bull-modal.component';
import { EditWeightModalComponent } from './weight-modal/weight-modal.component';
import { WarningDisplayComponent } from './warning-display/warning-display.component';
import {
  NgbAlertModule,
  NgbPopoverModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { CalvingStatsModalComponent } from './calving-stats-modal/calving-stats-modal.component';

const COMPONENTS = [
  BreedsListComponent,
  FormErrorsComponent,
  SireListComponent,
  AnimalModalComponent,
  BirthModalComponent,
  BullModalComponent,
  EditWeightModalComponent,
  WarningDisplayComponent,
  CalvingStatsModalComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSmartModalModule.forChild(),
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPopoverModule,
    NgbDropdownModule,
  ],
  exports: [...COMPONENTS, CommonModule, NgxSmartModalModule],
})
export class SharedComponentsModule {}
