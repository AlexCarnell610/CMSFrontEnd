import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { reducers } from '@cms-ngrx/reducers';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AnimalEffects } from 'libs/ngrx/src/lib/effects/src/animal.effects';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ModalsModule } from './components/modals/modals.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AnimalEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSmartModalModule.forRoot(),
    ModalsModule,
    NgbTooltipModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: ['/api/*']
      }      
    })
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
