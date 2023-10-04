import { UntypedFormBuilder } from '@angular/forms';
import { PageURLs } from '@cms-enums';
import { convertedAnimal, mockAnimal } from '@cms-testing-data';
import { of } from 'rxjs';
import { AnimalListComponent } from './animal-list.component';

describe('AnimalListComponent', () => {
  let component: AnimalListComponent, mockStore, fb, animalArray;
  beforeEach(() => {
    fb = new UntypedFormBuilder();
    animalArray = [convertedAnimal, mockAnimal];
    mockStore = {
      pipe: () => {
        return of(animalArray);
      },
    };

    component = new AnimalListComponent(fb, mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOninit [method]', () => {
    it('should emit when animal selected', () => {
      let animalSelectedEmitSpy = spyOn(component.animalSelected, 'emit');

      component.ngOnInit();
      component['$currentAnimal'].next(animalArray);
      expect(animalSelectedEmitSpy).toHaveBeenCalledWith(animalArray);
    });

    it('should popluate the animals observable', () => {
      component.ngOnInit();
      component.animals$.subscribe((ani) => {
        expect(ani).toEqual(animalArray);
      });
    });

    it('should popluate the animals observable registration page', () => {
      component.page = PageURLs.Registration;
      component.ngOnInit();
      component.animals$.subscribe((ani) => {
        expect(ani).toEqual(animalArray);
      });
    });

    it('should popluate the animals observable births page', () => {
      component.page = PageURLs.Births;
      component.ngOnInit();
      component.animals$.subscribe((ani) => {
        expect(ani).toEqual([mockAnimal]);
      });
    });

    it('should create the formgroup', () => {
      let fbGroupSpy = spyOn(fb, 'group').and.callThrough();
      component.ngOnInit();
      expect(fbGroupSpy).toHaveBeenCalled();
    });

    it('should populate the searched animals observable', () => {
      component.ngOnInit();
      component.searchedAnimals$.subscribe((animals) => {
        expect(animals).toEqual(animalArray);
      });
    });

    it('should filter the animals when search box value changes with more than two characters', () => {
      component.ngOnInit();
      component.searchBarGroup.get('searchBar').setValue('UK722218079336');
      component.searchedAnimals$.subscribe((animals) => {
        expect(animals).toEqual([convertedAnimal]);
      });
    });

    it('should reset the searched animal list to all animals if search string less than 3 chars', () => {
      component.ngOnInit();
      component.searchBarGroup.get('searchBar').setValue('UK');
      component.searchedAnimals$.subscribe((animals) => {
        expect(animals).toEqual(animalArray);
      });
    });
  });

  describe('open add modal [method]', () => {
    it('should emit add event', () => {
      component.add.subscribe((add) => {
        expect(add).toBeNull();
      });

      component.openAddModal(null);
    });
  });

  describe('open edit modal [method]', () => {
    it('should emit edit event', () => {
      component.edit.subscribe((edit) => {
        expect(edit).toBeNull();
      });

      component.openEditModal();
    });
  });

  describe('select animal [method]', () => {
    it('should set new animal every time if on animals page', () => {
      component.page = PageURLs.Animals;
      let pushAnimalSpy = spyOn<any>(
        component,
        'pushNextAnimal'
      ).and.callThrough();

      component.selectAnimal(convertedAnimal);
      component.selectAnimal(convertedAnimal);
      expect(pushAnimalSpy).toHaveBeenCalledTimes(2);
    });

    it('should only set new aniaml once if same animal selected not on animal page', () => {
      component.page = PageURLs.Weight;
      let pushAnimalSpy = spyOn<any>(
        component,
        'pushNextAnimal'
      ).and.callThrough();

      component.selectAnimal(convertedAnimal);
      component.selectAnimal(convertedAnimal);
      expect(pushAnimalSpy).toHaveBeenCalledTimes(1);
    });

    it('should set new animal if animal changes', () => {
      component.page = PageURLs.Births;
      let pushAnimalSpy = spyOn<any>(
        component,
        'pushNextAnimal'
      ).and.callThrough();

      component.selectAnimal(convertedAnimal);
      component.selectAnimal(mockAnimal);
      expect(pushAnimalSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getPillButtonText [method]', () => {
    [
      { page: PageURLs.Weight, result: 'Weights' },
      { page: PageURLs.Animals, result: 'Animal' },
      { page: PageURLs.Births, result: 'Births' },
      { page: PageURLs.CullUpdate, result: '' },
      { page: PageURLs.Login, result: '' },
      { page: PageURLs.Logout, result: '' },
      { page: PageURLs.MainMenu, result: '' },
      { page: PageURLs.Registration, result: 'Register Calf' },
    ].forEach((test) => {
      it(`should return ${test.result} on ${test.page} page`, () => {
        component.page = test.page;
        expect(component.pillButtonText).toEqual(test.result);
      });
    });
  });

  describe('getCSSForButton [method]', () => {
    it('should return active if tagnumber matches', () => {
      component.selectAnimal(convertedAnimal);
      expect(component.getCSSForButton(convertedAnimal)).toEqual('active');
    });

    it('should return no class if tagnumbers dont match', () => {
      component.selectAnimal(convertedAnimal);
      expect(component.getCSSForButton(mockAnimal)).toEqual('');
    });
  });

  describe('ngOndestroy', () => {
    let unsubscribeSpy;
    beforeEach(() => {
      unsubscribeSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
    });
    it('should call unsubscribe', () => {
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
