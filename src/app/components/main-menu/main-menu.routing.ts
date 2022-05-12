import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { AnimalComponent } from './cattle-components/animal/animal.component';
import { BirthComponent } from './cattle-components/birth/birth.component';
import { CullUpdateComponent } from './cattle-components/cull-update/cull-update.component';
import { RegistrationComponent } from './cattle-components/registration/registration.component';
import { WeightComponent } from './cattle-components/weight/weight.component';
import { MainMenuComponent } from './main-menu.component';
import { MedicationComponent } from './medication-components/medication/medication.component';
import { TreatmentComponent } from './medication-components/treatment/treatment.component';
import { ViewTreatmentsComponent } from './medication-components/treatment/view-treatments/view-treatments.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
  },
  {
    path: PageURLs.Weight,
    component: WeightComponent,
  },
  {
    path: PageURLs.Animals,
    component: AnimalComponent,
  },
  {
    path: PageURLs.Births,
    component: BirthComponent,
  },
  {
    path: PageURLs.CullUpdate,
    component: CullUpdateComponent,
  },
  {
    path: PageURLs.Registration,
    component: RegistrationComponent,
  },
  {
    path: PageURLs.Medication,
    component: MedicationComponent,
  },
  {
    path: PageURLs.Treatment,
    component: TreatmentComponent,
  },
  {
    path: `${PageURLs.Treatment}/${PageURLs.ViewTreatment}`,
    component: ViewTreatmentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuRoutingModule {}
