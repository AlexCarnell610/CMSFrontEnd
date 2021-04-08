import { PageURLs } from '@cms-enums';
import { convertedAnimal } from '@cms-testing-data';
import { of } from 'rxjs';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent,
    mockRouter,
    mockWarningService,
    mockAnimalService,
    mockLoadingService;

  beforeEach(() => {
    mockRouter = {
      navigate: () => {},
    };
    mockWarningService = { show: () => {} };
    mockAnimalService = {
      updateAnimal: () => {
        return Promise.resolve();
      },
    };
    mockLoadingService = { setLoadingState: () => {} };

    component = new RegistrationComponent(
      mockRouter,
      mockWarningService,
      mockAnimalService,
      mockLoadingService
    );
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to main menu', () => {
    let navSpy = spyOn(mockRouter, 'navigate');
    component.backToMain();
    expect(navSpy).toHaveBeenCalledWith([PageURLs.MainMenu]);
  });

  describe('registerAnimal [method]', () => {
    let warningShowSpy, setLoadingStateSpy, updateAnimalSpy;
    beforeEach(() => {
      setLoadingStateSpy = spyOn(mockLoadingService, 'setLoadingState');
      updateAnimalSpy = spyOn(
        mockAnimalService,
        'updateAnimal'
      ).and.callThrough();
      warningShowSpy = spyOn(mockWarningService, 'show');
    });

    it('should register animal if user continues from confirmation', async () => {
      warningShowSpy.and.returnValue(of(true));
      await component.registerAnimal(convertedAnimal);
      expect(setLoadingStateSpy).toHaveBeenCalledWith(true);
      expect(updateAnimalSpy).toHaveBeenCalledWith(convertedAnimal.tagNumber, {
        registered: true,
      });
      expect(setLoadingStateSpy).toHaveBeenCalledWith(false);
    });

    it('should not update animal if user cancels', async () => {
      warningShowSpy.and.returnValue(of(false));
      await component.registerAnimal(convertedAnimal);
      expect(updateAnimalSpy).not.toHaveBeenCalled();
    });
  });
});
