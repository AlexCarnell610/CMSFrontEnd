import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AnimalComponent } from './cattle-components/animal/animal.component';
import { WeightComponent } from './cattle-components/weight/weight.component';
import { MainMenuComponent } from './main-menu.component';

const routes: Routes = [
    {
        path: '',
        component: MainMenuComponent,
    },
    {
        path: 'weight',
        component: WeightComponent
    },
    {
        path: 'animals',
        component: AnimalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainMenuRoutingModule{}