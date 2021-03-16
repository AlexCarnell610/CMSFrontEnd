import { PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { of } from 'rxjs';
import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let mockRouter, mockAuthService, mockRoute, mockStore, mockLoadingService;
  let component, mockLoadingState;
  const mockAnimal = ({
    tagNumber: 1234,
  } as unknown) as Animal;

  beforeEach(() => {
    mockLoadingState = true;
    mockRouter = {
      navigate: () => {
        return;
      },
    };
    mockAuthService = {
      logout: () => {},
    };
    mockRoute = {};
    mockStore = {
      pipe: () => {
        return of(mockAnimal);
      },
    };
    mockLoadingService = {
      currentLoadingState: mockLoadingState,
    };

    component = new MainMenuComponent(
      mockRouter,
      mockAuthService,
      mockRoute,
      mockStore,
      mockLoadingService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate old males', (done) => {
    component.ngOnInit();
    component.$oldMales.subscribe((males) => {
      expect(males).toEqual(males);
      done();
    });
  });

  describe('Navigatoin functoins', () => {
    let navigateSpy;
    beforeEach(() => {
      navigateSpy = spyOn(mockRouter, 'navigate');
    });

    it('should navigate to weight screen', () => {
      component.weightScreen();
      expect(navigateSpy).toHaveBeenCalledWith([PageURLs.Weight], {
        relativeTo: mockRoute,
      });
    });

    it('should navigate to animal screen', () => {
      component.animalScreen();
      expect(navigateSpy).toHaveBeenCalledWith([PageURLs.Animals], {
        relativeTo: mockRoute,
      });
    });

    it('should navigate to birth screen', () => {
      component.birthScreen();
      expect(navigateSpy).toHaveBeenCalledWith([PageURLs.Births], {
        relativeTo: mockRoute,
      });
    });

    it('Should logout', () => {
      let logoutSpy = spyOn(mockAuthService, 'logout');
      component.logout();
      expect(logoutSpy).toHaveBeenCalled();
    });

    it('should get the current loading state', () => {
      expect(component.loading).toEqual(mockLoadingState);
    });
  });
});
