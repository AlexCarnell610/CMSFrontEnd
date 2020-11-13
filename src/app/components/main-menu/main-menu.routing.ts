import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { WeightComponent } from './cattle-components/weight/weight.component';
import { MainMenuComponent } from './main-menu.component';

const routes: Routes = [
    {
        path: '',
        component: MainMenuComponent
    },
    {
        path: 'weight',
        component: WeightComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainMenuRoutingModule{}