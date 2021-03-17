import { Modals, PageURLs } from '@cms-enums';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

fdescribe('AppComponent', () => {
  let mockAuthService, mockLoadingService, mockStore, mockNgbAlertConfig;
  let mockScreenSizeService, mockPusherService, mockCullUpdateService;
  let mockLocation, mockModalService, mockModalComp;
  let component: AppComponent;
  beforeEach(() => {
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
    mockPusherService = { channel: { bind: () => {} } };
    mockCullUpdateService = {};
    mockModalService = {
      get: () => {
        return mockModalComp;
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
});
