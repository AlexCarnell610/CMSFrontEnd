import { Modals, PageURLs } from '@cms-enums';
import { CullUpdateService } from '@cms-services';
import { PusherChannels } from 'libs/enums/src/lib/pusher-channels';
import { PusherMock } from 'pusher-js-mock';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mockAuthService, mockLoadingService, mockStore, mockNgbAlertConfig;
  let mockScreenSizeService, mockPusherService, mockCullUpdateService;
  let mockLocation, mockModalService, mockModalComp;
  let component: AppComponent;
  let pusher, channel;
  beforeEach(() => {
    pusher = new PusherMock();
    channel = pusher.subscribe('cull-update');

    mockLocation = { href: 'main-menu' };
    mockScreenSizeService = {
      screenWidth: {},
    };
    mockAuthService = {
      isAuthenticated$: of(true),
      authLoading: of(),
    };
    mockLoadingService = {
      currentLoadingState: of(),
    };
    mockStore = {
      dispatch: () => {},
    };
    mockNgbAlertConfig = {};

    mockPusherService = {
      channel,
    };
    mockCullUpdateService = new CullUpdateService();
    mockModalService = {
      get: () => {
        return mockModalComp;
      },
      getHigherIndex: () => {
        return 123;
      },
    };

    mockModalComp = {
      open: () => {},
      close: () => {},
    };
    component = new AppComponent(
      mockLocation,
      mockAuthService,
      mockLoadingService,
      mockStore,
      mockNgbAlertConfig,
      mockScreenSizeService,
      mockPusherService,
      mockCullUpdateService,
      mockModalService
    );
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should not dispatch is not authenticated', () => {
    let dispatchSpy = spyOn(mockStore, 'dispatch');
    mockAuthService.isAuthenticated$ = of(false);
    component.ngOnInit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  describe('Authenticated', () => {
    beforeEach(() => {
      mockAuthService.isAuthenticated$ = of(true);
    });
    it('Should dispatch actoins', () => {
      let dispatchSpy = spyOn(mockStore, 'dispatch');
      component.ngOnInit();
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
    });

    it('should bind to cull update channel', () => {
      let bindSpy = spyOn(mockPusherService.channel, 'bind');
      component.ngOnInit();
      expect(bindSpy).toHaveBeenCalled();
    });

    it('should set the cull data', () => {
      let mockPusherData = { animal: 'MOCKDATA' };
      let cullUpdateSpy = spyOnProperty(
        mockCullUpdateService,
        'cullUpdate',
        'set'
      );
      component.ngOnInit();
      channel.emit(PusherChannels.CullUpdate, mockPusherData);
      expect(cullUpdateSpy).toHaveBeenCalledWith(mockPusherData.animal);
    });
  });

  it('resize should update screenwidth', () => {
    const newSize = 120;
    const event = { currentTarget: { innerWidth: newSize } };
    expect(mockScreenSizeService.screenWidth).toEqual({});
    component.resize(event);
    expect(mockScreenSizeService.screenWidth).toEqual(newSize);
  });

  describe('AfterViewInit() [method]', () => {
    let modalGetSpy, modalOpenSpy, modalCloseSpy;
    beforeEach(() => {
      mockLocation.href = PageURLs.MainMenu;
      modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
      modalOpenSpy = spyOn(mockModalComp, 'open');
      modalCloseSpy = spyOn(mockModalComp, 'close');
    });
    it('should open loading spinner if dataloading true, or authloading true and on main menu path', () => {
      mockLoadingService.currentLoadingState = of(true);
      mockAuthService.isLoading$ = of(true);
      component.ngAfterViewInit();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Loading);
      expect(modalOpenSpy).toHaveBeenCalled();
    });

    it('should not open loading spinner if no loading is happening', () => {
      mockAuthService.isLoading$ = of(false);
      mockLoadingService.currentLoadingState = of(false);
      component.ngAfterViewInit();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Loading);
      expect(modalOpenSpy).not.toHaveBeenCalled();
      expect(modalCloseSpy).toHaveBeenCalled();
    });

    it('Should not open loading spinner if not on main-menu route', () => {
      mockLocation.href = PageURLs.Login;
      mockLoadingService.currentLoadingState = of(true);
      mockAuthService.isLoading$ = of(true);
      component.ngAfterViewInit();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Loading);
      expect(modalCloseSpy).toHaveBeenCalled();
      expect(modalOpenSpy).not.toHaveBeenCalled();
    });
  });

  describe('ngOndestroy', () => {
    let unsubscribeSpy;
    beforeEach(() => {
      unsubscribeSpy = spyOn<any>(component['subs'], 'unsubscribe');
    });
    it('should call unsubscribe', () => {
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
