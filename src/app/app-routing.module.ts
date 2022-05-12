import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { PageURLs } from '@cms-enums';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
    path: PageURLs.MainMenu,
    loadChildren: () =>
      import('./components/main-menu/main-menu.module').then(
        (m) => m.MainMenuModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: PageURLs.Login,
    component: LoginComponent,
  },
  {
    path: PageURLs.Logout,
    component: LogoutComponent,
  },
  {
    path: '**',
    redirectTo: PageURLs.Login,
    pathMatch: 'full',
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
