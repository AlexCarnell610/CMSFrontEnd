import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AnimalDisplayComponent } from './cattle-components/animal/animal-display/animal-display.component';
import { AnimalComponent } from './cattle-components/animal/animal.component';
import { BirthComponent } from './cattle-components/birth/birth.component';
import { WeightComponent } from './cattle-components/weight/weight.component';
import { MainMenuComponent } from './main-menu.component';
import { MainMenuRoutingModule } from './main-menu.routing';
import { RegistrationComponent } from './cattle-components/registration/registration.component';
import { MedicationComponent } from './medication-components/medication/medication.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { BulkWeightModalComponent } from './cattle-components/weight/bulk-weight-modal/bulk-weight-modal.component';
import { NgChartsModule } from 'ng2-charts';
import { EditBulkWeightModalComponent } from './cattle-components/weight/bulk-weight-modal/edit-bulk-weight-modal/edit-bulk-weight-modal.component';
import { MedicationAddModalComponent } from './medication-components/medication-add-modal/medication-add-modal.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MedicationListComponent } from './medication-components/medication-list/medication-list.component';
import { TreatmentModalComponent } from './medication-components/treatment-modal/treatment-modal.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    WeightComponent,
    AnimalComponent,
    AnimalDisplayComponent,
    BirthComponent,
    RegistrationComponent,
    MedicationComponent,
    BulkWeightModalComponent,
    EditBulkWeightModalComponent,
    MedicationAddModalComponent,
    MedicationListComponent,
    TreatmentModalComponent
  ],
  imports: [
    CommonModule,
    MainMenuRoutingModule,
    NgChartsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forChild(),
    NgbModule,
    SharedComponentsModule,
    NgbPopoverModule,
    ZXingScannerModule,
    FormsModule
  ],
  exports: [MainMenuComponent],
})
export class MainMenuModule {}
