import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedsListComponent } from './breeds-list/breeds-list.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SireListComponent } from './sire-list/sire-list.component';
import { ModalsModule } from '../components/modals/modals.module';

const COMPONENTS = [BreedsListComponent, FormErrorsComponent, SireListComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, ReactiveFormsModule, ModalsModule],
  exports: COMPONENTS,
})
export class SharedComponentsModule {}
