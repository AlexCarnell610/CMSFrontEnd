import { PageURLs } from '@cms-enums';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';

fdescribe('LoginComponent', () => {
  let mockRouter, mockAuthService, component;
  beforeEach(() => {
    mockRouter = {
      navigate: () => {},
    };
    mockAuthService = {
      isAuthenticated$: of(true),
      loginWithPopup: () => {
        return of();
      },
    };

    component = new LoginComponent(mockRouter, mockAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('NgOnInit', () => {
    let signInSpy;
    beforeEach(() => {
      signInSpy = spyOn(component, 'handleSignIn');
    });

    it('should call sign in if authenticated', () => {
      component.ngOnInit();
      expect(signInSpy).toHaveBeenCalled();
    });

    it('Should not call sign in if not authenticated and enable login button', () => {
      mockAuthService.isAuthenticated$ = of(false);
      component.ngOnInit();
      expect(signInSpy).not.toHaveBeenCalled();
      expect(component.loginDisable).toBeFalse();
    });
  });

  describe('handleSignIn [method]', () => {
    let navigateSpy;
    beforeEach(() => {
      navigateSpy = spyOn(mockRouter, 'navigate');
    });
    it('Should navigate to main menu and disable login button', () => {
      component.handleSignIn();
      expect(navigateSpy).toHaveBeenCalledWith([PageURLs.MainMenu]);
      expect(component.loginDisable).toBeTrue();
    });
  });
});
