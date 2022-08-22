import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedsListComponent } from './breeds-list/breeds-list.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [BreedsListComponent, FormErrorsComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, ReactiveFormsModule],
  exports: COMPONENTS,
})
export class SharedComponentsModule {}
