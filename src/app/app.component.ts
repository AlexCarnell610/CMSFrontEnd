import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RootState } from '@cms-ngrx/reducers';
import { Store } from '@ngrx/store';
import { RetrieveAnimalData } from 'libs/ngrx/src/lib/actions/src/animal.actions';
import { LoadingPaneService } from 'libs/services/services/src/loading-pane.service';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CMSFrontEnd';
  constructor(
    public auth: AuthService,
    public loadingService: LoadingPaneService,
    private readonly store: Store<RootState>
  ) {
    // router.events.subscribe(event => console.error(event))
    // auth.isLoading$.subscribe((loading) => {
    //   console.warn(loading);
    // });
    // auth.error$.subscribe((error) => {
    //   console.error('AUTTHTHTHTHTHHTHT', error);
    // });
  }

  ngOnInit(){
    this.auth.isAuthenticated$.subscribe(authed => {
      if (authed) {
        //could do something with sessoin storage to stop redownloading data on refresh
        this.store.dispatch(new RetrieveAnimalData());
      }
    })
  }
}
