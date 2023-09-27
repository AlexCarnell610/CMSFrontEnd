import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceRoutingModule } from './performance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateParserFormatter, NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { CullUpdateComponent } from './cull-update/cull-update.component';
import { PerformanceHomeComponent } from './performance-home.component';
import { WeightAnalysisComponent } from './weight-analysis/weight-analysis.component';
import { NgbCustomDateParserFormatter } from './ngb-custom-date-formatter-parser';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CullUpdateComponent,
    PerformanceHomeComponent,
    WeightAnalysisComponent,
  ],
  imports: [
    CommonModule,
    PerformanceRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgxSmartModalModule.forChild(),
    NgbModule,
    FormsModule,
    SharedComponentsModule,
    NgbPopoverModule,
  ],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbCustomDateParserFormatter}
  ]
})
export class PerformanceModule {}
