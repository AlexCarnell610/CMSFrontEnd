import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';

const COMPONENTS = [HeaderComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, NgbTooltipModule],
  exports: COMPONENTS,
})
export class SharedComponentsModule {}
