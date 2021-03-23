import { Modals, PageURLs } from '@cms-enums';
import { mockAnimal } from '@cms-testing-data';
import { BirthComponent } from './birth.component';

fdescribe('BirthComponent', () => {
  let component: BirthComponent, mockRouter, mockModalService, mockModal;
  let modalGetSpy, modalOpenSpy;

  beforeEach(() => {
    mockModal = {
      open: () => {},
    };
    mockRouter = { navigate: () => {} };
    mockModalService = {
      get: () => {
        return mockModal;
      },
    };
    component = new BirthComponent(mockRouter, mockModalService);
    modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
    modalOpenSpy = spyOn(mockModal, 'open');
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate to main menu', () => {
    let routerNavigateSpy = spyOn(mockRouter, 'navigate');
    component.backToMain();
    expect(routerNavigateSpy).toHaveBeenCalledWith([PageURLs.MainMenu]);
  });

  it('Should open the birth modal in add mode', () => {
    component.isAdd = false;
    component.addBirth();
    expect(component.isAdd).toBeTrue();
    expect(modalGetSpy).toHaveBeenCalledWith(Modals.Birth);
    expect(modalOpenSpy).toHaveBeenCalled();
  });
  it('should open the birth modal in edit mode', () => {
    component.isAdd = true;
    component.editBirth();
    expect(component.isAdd).toBeFalse();
    expect(modalGetSpy).toHaveBeenCalledWith(Modals.Birth);
    expect(modalOpenSpy).toHaveBeenCalled();
  });

  it('should add the new animal to observable', () => {
    expect(component.$selectedAnimal.value).toBeNull();
    component.animalSelected(mockAnimal);
    expect(component.$selectedAnimal.value).toEqual(mockAnimal);
  });
});
