import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mockAuthService, mockLoadingService
    let mockScreenSizeService, mockStore, mockNgbAlertConfig
    let component: AppComponent;
  beforeEach(() => {

    mockScreenSizeService = {
      screenWidth: {}
    };
    mockAuthService = {
      isAuthenticated$: of(true)
    };
    mockLoadingService = {};
    mockStore = {
      dispatch: () =>{}
    };
    mockNgbAlertConfig = {};
    
    component = new AppComponent(mockAuthService, mockLoadingService, mockStore, mockNgbAlertConfig, mockScreenSizeService);
  });

  it('should create the app', () => {
    
    expect(component).toBeTruthy()
  });

  it("Should dispatch actoins if authenticated", () =>{
    let dispatchSpy = spyOn(mockStore, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it("should not dispatch is not authenticated", () =>{
    let dispatchSpy = spyOn(mockStore, 'dispatch');
    mockAuthService.isAuthenticated$ = of(false);
    expect(dispatchSpy).not.toHaveBeenCalled();
  })

  it("resize should update screenwidth", () => {
    const newSize = 120;
    const event = {currentTarget: {innerWidth: newSize}};
    expect(mockScreenSizeService.screenWidth).toEqual({});
    component.resize(event);
    expect(mockScreenSizeService.screenWidth).toEqual(newSize);
  });
});
