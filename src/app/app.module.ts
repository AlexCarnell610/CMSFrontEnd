import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { reducers } from '@cms-ngrx';
import { AnimalEffects } from '@cms-ngrx/animal';
import { BullEffects } from '@cms-ngrx/bull';
import { MedicationEffects } from '@cms-ngrx/medication';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TreatmentEffects } from '@cms-ngrx/treatment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        FooterComponent,
        LoadingModalComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            },
        }),
        EffectsModule.forRoot([AnimalEffects, BullEffects, MedicationEffects, TreatmentEffects]),
        environment.production ? [] : StoreDevtoolsModule.instrument({ connectInZone: true }),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxSmartModalModule.forRoot(),
        NgbTooltipModule,
        NgbDropdownModule,
        NgbDatepickerModule,
        AuthModule.forRoot({
            ...environment.auth,
            httpInterceptor: {
                allowedList: ['/api/*', '/devApi/*'],
            },
        })], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
        {
            provide: 'locationObj',
            useValue: location,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
