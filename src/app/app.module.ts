import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { reducers } from '@cms-ngrx';
import { AnimalEffects } from '@cms-ngrx/animal';
import { BullEffects } from '@cms-ngrx/bull';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';
import { MedicationEffects } from '../../libs/ngrx/src/lib/medicationState/medication.effects';
import { TreatmentEffects } from '../../libs/ngrx/src/lib/treatmentState/treatment.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const EFFECTS = [
  AnimalEffects,
  BullEffects,
  MedicationEffects,
  TreatmentEffects,
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    FooterComponent,
    LoadingModalComponent,
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(EFFECTS),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSmartModalModule.forRoot(),
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: ['/api/*', '/devApi/*'],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: 'locationObj',
      useValue: location,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
