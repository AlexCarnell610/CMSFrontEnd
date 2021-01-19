import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoadingPaneService } from 'libs/services/services/src/loading-pane.service';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CMSFrontEnd';
  constructor(
    public auth: AuthService,
    public loadingService: LoadingPaneService
  ) {
    // router.events.subscribe(event => console.error(event))
    // auth.isLoading$.subscribe((loading) => {
    //   console.warn(loading);
    // });
    // auth.error$.subscribe((error) => {
    //   console.error('AUTTHTHTHTHTHHTHT', error);
    // });
  }
}
