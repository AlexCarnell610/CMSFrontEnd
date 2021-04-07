import { waitForAsync } from '@angular/core/testing';
import { Modals, PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { take } from 'rxjs/operators';
import { AnimalComponent } from './animal.component';

describe('AnimalComponent', () => {
  let component: AnimalComponent;
  let mockRouter,
    mockModalService,
    mockScreenService,
    mockModalComp,
    mockAnimal;

  beforeAll(() => {
    mockAnimal = { tagNumber: 'TAGNUMBER' } as Animal;
  });

  beforeEach(() => {
    mockRouter = { navigate: () => {} };
    mockModalService = {
      get: () => {
        return mockModalComp;
      },
    };
    mockScreenService = {};
    mockModalComp = { open: () => {} };

    component = new AnimalComponent(
      mockRouter,
      mockModalService,
      mockScreenService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('backToMain [method]', () => {
    it('should navigate to main menu', () => {
      const navigateSpy = spyOn(mockRouter, 'navigate');
      component.backToMain();
      expect(navigateSpy).toHaveBeenCalledWith([PageURLs.MainMenu]);
    });
  });
  describe('addAnimal, editAnimal [method]', () => {
    let modalGetSpy, modalOpenSpy;
    beforeEach(() => {
      modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
      modalOpenSpy = spyOn(mockModalComp, 'open');
    });
    it('should open the animal modal in add mode', () => {
      component.addAnimal();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Animal);
      expect(modalOpenSpy).toHaveBeenCalled();
      expect(component.isAdd).toBeTrue();
    });

    it('should open the animal modal in edit mode', () => {
      component.editAnimal();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Animal);
      expect(modalOpenSpy).toHaveBeenCalled();
      expect(component.isAdd).toBeFalse();
    });
  });
  it(
    'Should add next animal to observable',
    waitForAsync(() => {
      component.$selectedAnimal.pipe(take(1)).subscribe((animal) => {
        expect(animal).toBeNull();
      });
      component.animalSelected(mockAnimal);
      component.$selectedAnimal.pipe(take(1)).subscribe((animal) => {
        expect(animal).toEqual(mockAnimal);
      });
    })
  );
});
