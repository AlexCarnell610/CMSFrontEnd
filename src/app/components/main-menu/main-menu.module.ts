import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainMenuComponent } from './main-menu.component';
import { MainMenuRoutingModule } from './main-menu.routing';
import { WeightComponent } from './cattle-components/weight/weight.component';



@NgModule({
  declarations: [MainMenuComponent, WeightComponent],
  imports: [
    CommonModule,
    MainMenuRoutingModule
  ], 
  exports: [
    MainMenuComponent
  ]
})
export class MainMenuModule { }
