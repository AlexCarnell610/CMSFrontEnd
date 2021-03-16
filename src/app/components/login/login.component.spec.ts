import { PageURLs } from '@cms-enums';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
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

    it('Should not call signing if not authenticated', () => {
      mockAuthService.isAuthenticated$ = of(false);
      component.ngOnInit();
      expect(signInSpy).not.toHaveBeenCalled();
    });
  });

  describe('handleSignIn [method]', () => {
    let navigateSpy;
    beforeEach(() => {
      navigateSpy = spyOn(mockRouter, 'navigate');
    });
    it('Should navigate to main menu', () => {
      component.handleSignIn();
      expect(navigateSpy).toHaveBeenCalledWith([PageURLs.MainMenu]);
    });
  });

  describe('signOut [method]', () => {
    let authLoginSpy;
    beforeEach(() => {
      authLoginSpy = spyOn(mockAuthService, 'loginWithPopup');
    });

    it('should call signingwithpopup method', () => {
      component.signOut();
      expect(authLoginSpy).toHaveBeenCalled();
    });
  });
});
