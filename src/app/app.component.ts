import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RootState } from '@cms-ngrx';
import { RetrieveAnimalData } from '@cms-ngrx/animal';
import { RetreieveBullData } from '@cms-ngrx/bull';
import { LoadingPaneService, ScreenSizeService } from '@cms-services';
import { NgbAlertConfig, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
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
    ngbTooltipConf: NgbTooltipConfig,
    private readonly screenSizeService: ScreenSizeService
  ) {
    ngbAlertConfig.dismissible = false;
  }
  ngOnInit() {
    Moment.locale('en-gb');
    this.auth.isAuthenticated$.subscribe((authed) => {
      if (authed) {
        //could do something with sessoin storage to stop redownloading data on refresh
        //would need marker to mark session data as old
        this.store.dispatch(new RetrieveAnimalData());
        this.store.dispatch(new RetreieveBullData());
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.screenSizeService.screenWidth = event.currentTarget.innerWidth;
  }
}
