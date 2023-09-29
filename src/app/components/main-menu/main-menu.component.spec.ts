import { Modals, PageURLs } from '@cms-enums';
import { IAnimal } from '@cms-interfaces';
import { convertedAnimal } from '@cms-testing-data';
import * as moment from 'moment';
import { of } from 'rxjs';
import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let mockRouter,
    mockAuthService,
    mockRoute,
    mockStore,
    mockLoadingService,
    mockModalService;
  let component: MainMenuComponent, mockLoadingState, mockModal;
  const mockAnimal = ({
    tagNumber: 1234,
  } as unknown) as IAnimal;

  beforeEach(() => {
    mockModal = { open: () => {} };
    mockModalService = {
      get: () => {
        return mockModal;
      },
    };
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
        return of([mockAnimal]);
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
      mockLoadingService,
      mockModalService
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

  it('shoudl populate allUnregCalves', () => {
    let overdueCalves = [
      { ...convertedAnimal, birthDate: moment().subtract(28, 'days') },
    ];
    let unregCalves = [
      { ...mockAnimal, birthDate: moment().subtract(3, 'days') },
    ];
    spyOn(mockStore, 'pipe').and.returnValues(
      of(mockAnimal),
      of(unregCalves),
      of(overdueCalves)
    );
    component.ngOnInit();
    component.$allUnregCalves.subscribe((allUnregCalves) => {
      expect(allUnregCalves.overdue).toEqual(overdueCalves);
      expect(allUnregCalves.unreg).toEqual(unregCalves);
    });
  });

  it('should open the weight modal', () => {
    let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
    let modalOpenSpy = spyOn(mockModal, 'open');
    component.openWeightModal(mockAnimal);
    expect(component.selectedAnimal).toEqual(mockAnimal);
    expect(modalGetSpy).toHaveBeenCalledWith(Modals.Weight);
    expect(modalOpenSpy).toHaveBeenCalled();
  });

  describe('Navigation functions', () => {
    let navigateSpy;
    beforeEach(() => {
      navigateSpy = spyOn(mockRouter, 'navigate');
    });

    it('should navigate to the registration screen', () => {
      component.registrationScreen();
      expect(navigateSpy).toHaveBeenCalledWith([PageURLs.Registration], {
        relativeTo: mockRoute,
      });
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

    it('should navigate to cullupdate screen', () => {
      component.performance();
      expect(navigateSpy).toHaveBeenCalledWith([PageURLs.CullUpdate], {
        relativeTo: mockRoute,
      });
    });

    it('should get the current loading state', () => {
      expect(component.loading).toEqual(mockLoadingState);
    });
  });
});
