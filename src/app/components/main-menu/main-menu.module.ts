import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ModalsModule } from '../modals/modals.module';
import { WeightComponent } from './cattle-components/weight/weight.component';
import { MainMenuComponent } from './main-menu.component';
import { MainMenuRoutingModule } from './main-menu.routing';



@NgModule({
  declarations: [MainMenuComponent, WeightComponent],
  imports: [
    CommonModule,
    MainMenuRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forChild(),
    ModalsModule,
    NgbModule
  ], 
  exports: [
    MainMenuComponent
  ]
})
export class MainMenuModule { }
