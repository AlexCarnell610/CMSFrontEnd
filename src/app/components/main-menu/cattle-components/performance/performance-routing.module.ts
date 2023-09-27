import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { CullUpdateComponent } from './cull-update/cull-update.component';
import { PerformanceHomeComponent } from './performance-home.component';
import { WeightAnalysisComponent } from './weight-analysis/weight-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: PerformanceHomeComponent
  },
  {
    path: PageURLs.CullUpdate,
    component: CullUpdateComponent
  },
  {
    path: PageURLs.WeightAnalysis,
    component: WeightAnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
