import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { WeightComponent } from './cattle-components/weight/weight.component';
import { MainMenuComponent } from './main-menu.component';
import { MainMenuRoutingModule } from './main-menu.routing';



@NgModule({
  declarations: [MainMenuComponent, WeightComponent],
  imports: [
    CommonModule,
    MainMenuRoutingModule,
    ChartsModule,
    ReactiveFormsModule
  ], 
  exports: [
    MainMenuComponent
  ]
})
export class MainMenuModule { }
