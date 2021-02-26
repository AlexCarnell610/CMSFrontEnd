import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ModalsModule } from '../modals/modals.module';
import { AnimalDisplayComponent } from './cattle-components/animal/animal-display/animal-display.component';
import { AnimalComponent } from './cattle-components/animal/animal.component';
import { BirthComponent } from './cattle-components/birth/birth.component';
import { AnimalListComponent } from './cattle-components/shared-components/animal-list/animal-list.component';
import { WarningDisplayComponent } from './cattle-components/shared-components/warning-display/warning-display.component';
import { WeightComponent } from './cattle-components/weight/weight.component';
import { MainMenuComponent } from './main-menu.component';
import { MainMenuRoutingModule } from './main-menu.routing';

@NgModule({
  declarations: [
    MainMenuComponent,
    WeightComponent,
    AnimalComponent,
    AnimalListComponent,
    AnimalDisplayComponent,
    WarningDisplayComponent,
    BirthComponent,
  ],
  imports: [
    CommonModule,
    MainMenuRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forChild(),
    ModalsModule,
    NgbModule,
  ],
  exports: [MainMenuComponent],
})
export class MainMenuModule {}
