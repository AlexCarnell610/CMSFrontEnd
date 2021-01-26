import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RootState } from '@cms-ngrx/reducers';
import { NgbAlertConfig, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { RetrieveAnimalData } from 'libs/ngrx/src/lib/actions/src/animal.actions';
import { LoadingPaneService } from 'libs/services/services/src/loading-pane.service';
import * as Moment from 'moment';

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
    private readonly store: Store<RootState>,
    ngbAlertConfig: NgbAlertConfig,
    ngbTooltipConf: NgbTooltipConfig
  ) {
    // router.events.subscribe(event => console.error(event))
    // auth.isLoading$.subscribe((loading) => {
    //   console.warn(loading);
    // });
    // auth.error$.subscribe((error) => {
    //   console.error('AUTTHTHTHTHTHHTHT', error);
    // });
  ngbAlertConfig.dismissible = false
  }

  ngOnInit(){
    Moment.locale('en-gb');
    // this.auth.logout()
    this.auth.isAuthenticated$.subscribe(authed => {
      if (authed) {
        //could do something with sessoin storage to stop redownloading data on refresh
        //would need marker to mark session data as old
        this.store.dispatch(new RetrieveAnimalData());
      }
    })
  }
}
