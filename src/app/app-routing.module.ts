import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: PageURLs.MainMenu,
    loadChildren: () => import('./components/main-menu/main-menu.module').then(m => m.MainMenuModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
