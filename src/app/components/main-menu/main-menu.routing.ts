import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './cattle-components/animal/animal.component';
import { BirthComponent } from './cattle-components/birth/birth.component';
import { RegistrationComponent } from './cattle-components/registration/registration.component';
import { WeightComponent } from './cattle-components/weight/weight.component';
import { MainMenuComponent } from './main-menu.component';
import { MedicationComponent } from './medication-components/medication/medication.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
  },
  {
    path: 'weight',
    component: WeightComponent,
  },
  {
    path: 'animals',
    component: AnimalComponent,
  },
  {
    path: 'births',
    component: BirthComponent,
  },
  {
    path: 'performance',
    loadChildren: () =>
      import('./cattle-components/performance/performance.module').then(
        (m) => m.PerformanceModule
      ),
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'medication',
    component: MedicationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuRoutingModule {}
