import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Modals } from '@cms-enums';
import { RootState } from '@cms-ngrx';
import { RetrieveAnimalData } from '@cms-ngrx/animal';
import { RetreieveBullData } from '@cms-ngrx/bull';
import { LoadingPaneService, ScreenSizeService } from '@cms-services';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CullUpdateService } from 'libs/services/services/src/cull-update.service';
import { PusherService } from 'libs/services/services/src/pusher.service';
import * as Moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'CMSFrontEnd';
  private subs = new Subscription();
  constructor(
    public auth: AuthService,
    private loadingService: LoadingPaneService,
    private readonly store: Store<RootState>,
    ngbAlertConfig: NgbAlertConfig,
    private readonly screenSizeService: ScreenSizeService,
    private readonly pusherService: PusherService,
    private readonly cullUpdateService: CullUpdateService,
    private readonly modalService: NgxSmartModalService,
    private readonly route: Router
  ) {
    ngbAlertConfig.dismissible = false;
  }
  ngOnInit() {
    Moment.locale('en-gb');
    this.subs.add(
      this.auth.isAuthenticated$.subscribe((authed) => {
        if (authed) {
          //could do something with sessoin storage to stop redownloading data on refresh
          //would need marker to mark session data as old
          this.store.dispatch(new RetrieveAnimalData());
          this.store.dispatch(new RetreieveBullData());

          this.pusherService.channel.bind('cull-update', (data) => {
            this.cullUpdateService.cullUpdate = data.animal;
          });
        }
      })
    );
  }
  ngAfterViewInit() {
    combineLatest([
      this.auth.isLoading$,
      this.loadingService.currentLoadingState,
    ]).subscribe(([authLoading, dataLoading]) => {
      if (
        (dataLoading || authLoading) &&
        window.location.href.includes('main-menu')
      ) {
        this.modalService.get(Modals.Loading).open();
      } else {
        this.modalService.get(Modals.Loading).close();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.screenSizeService.screenWidth = event.currentTarget.innerWidth;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
