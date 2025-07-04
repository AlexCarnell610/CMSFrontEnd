import { Component, OnInit, AfterViewInit, OnDestroy, Inject, HostListener, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Modals, PageURLs } from '@cms-enums';
import { RootState } from '@cms-ngrx';
import { RetrieveAnimalData } from '@cms-ngrx/animal';
import { RetreieveBullData } from '@cms-ngrx/bull';
import { initialLoadMedications } from '@cms-ngrx/medication';
import {
  CullUpdateService,
  LoadingPaneService,
  ScreenSizeService,
} from '@cms-services';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { PusherChannels } from 'libs/enums/src/lib/pusher-channels';
import { PusherService } from 'libs/services/src/pusher.service';
import moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'CMSFrontEnd';
  private subs = new Subscription();
  constructor(
    @Inject('locationObj') private location: Location,
    public readonly auth: AuthService,
    private readonly loadingService: LoadingPaneService,
    private readonly ngbAlertConfig: NgbAlertConfig,
    private readonly screenSizeService: ScreenSizeService,
    private readonly pusherService: PusherService,
    private readonly cullUpdateService: CullUpdateService,
  ) {
    this.ngbAlertConfig.dismissible = false;
  }


  readonly modalService = inject(NgxSmartModalService)
  readonly store = inject(Store<RootState>)
  ngOnInit() {
    moment.locale('en-gb');
    this.subs.add(
      this.auth.isAuthenticated$.subscribe((authed) => {
        if (authed) {
          //could do something with sessoin storage to stop redownloading data on refresh
          //would need marker to mark session data as old
          this.store.dispatch(new RetrieveAnimalData());
          this.store.dispatch(new RetreieveBullData());
          this.store.dispatch(initialLoadMedications());
          this.cullUpdateService.populateCullUpdate()
          this.pusherService.channel.bind(PusherChannels.CullUpdate, (data) => {
            this.cullUpdateService.cullUpdate = data.animal;
          });
        }
      },error => {console.warn(error)}, () => console.warn("COMPLOETRE"))
    );
  }

  ngAfterViewInit() {
    let isOpen = false;
    const loadingModal = this.modalService.get(Modals.Loading);
    combineLatest([
      this.auth.isLoading$,
      this.loadingService.currentLoadingState,
    ])
      .pipe(debounceTime(300))
      .subscribe(([authLoading, dataLoading]) => {
        if (
          (dataLoading || authLoading) &&
          this.location.href.includes(PageURLs.MainMenu)
        ) {
          if (!isOpen) {
            loadingModal.layerPosition = this.modalService.getHigherIndex();
            loadingModal.open(true);
            isOpen = true;
          }
        } else {
          loadingModal.close();
          isOpen = false;
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
