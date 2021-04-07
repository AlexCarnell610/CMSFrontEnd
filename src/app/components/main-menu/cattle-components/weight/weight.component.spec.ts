import { Modals, PageURLs } from '@cms-enums';
import { AnimalWeight } from '@cms-interfaces';
import { convertedAnimal } from '@cms-testing-data';
import { WeightComponent } from './weight.component';

describe('WeightComponent', () => {
  let component: WeightComponent,
    mockModalService,
    mockModal,
    mockRouter,
    mockScreenService;

  let modalGetSpy, modalOpenSpy, routerNavSpy;

  beforeEach(() => {
    mockModalService = {
      get: () => {
        return mockModal;
      },
    };
    mockModal = { open: () => {} };
    mockRouter = { navigate: () => {} };
    mockScreenService = {};

    modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
    modalOpenSpy = spyOn(mockModal, 'open');
    routerNavSpy = spyOn(mockRouter, 'navigate');
    component = new WeightComponent(
      mockModalService,
      mockRouter,
      mockScreenService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit [method]', () => {
    let weightData: AnimalWeight[];
    beforeEach(() => {
      weightData = convertedAnimal.weightData;
      component.ngOnInit();
    });

    it('Should set the selected animal', () => {
      component.$selectedAnimal.next(convertedAnimal);

      expect(component.selectedAnimal).toEqual(convertedAnimal);
    });

    it('should set the weight chart data', () => {
      component.$selectedAnimal.next(convertedAnimal);
      let tagNumber = convertedAnimal.tagNumber;
      let chartData = [
        {
          data: [weightData[0].weight, weightData[1].weight],
          label: tagNumber,
        },
      ];
      expect(component.chartWeights).toEqual(chartData);
    });

    it('should set the weight chart labels', () => {
      component.$selectedAnimal.next(convertedAnimal);
      let chartLabels = [
        weightData[0].weightDate.format('L'),
        weightData[1].weightDate.format('L'),
      ];
      expect(component.chartLabels).toEqual(chartLabels);
    });
  });

  describe('animalSelected [method]', () => {
    it('should set the next animal to the one selected', () => {
      let selectedAnimalNextSpy = spyOn(
        component.$selectedAnimal,
        'next'
      ).and.callThrough();
      component.animalSelected(convertedAnimal);
      expect(selectedAnimalNextSpy).toHaveBeenCalledWith(convertedAnimal);
    });
  });

  describe('open add modal [method]', () => {
    it('should call the open spy on the modal and set to add mode', () => {
      component.openAddModal();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Weight);
      expect(modalOpenSpy).toHaveBeenCalled();
      expect(component.isAddMode).toBeTrue();
    });
  });
  describe('open edit modal [method]', () => {
    it('Should call the open method and set to edit mode', () => {
      component.openEditModal();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Weight);
      expect(modalOpenSpy).toHaveBeenCalled();
      expect(component.isAddMode).toBeFalse();
    });
  });

  describe('Back to main [method]', () => {
    it('should call the naviagte method with the correct page', () => {
      component.backToMain();
      expect(routerNavSpy).toHaveBeenCalledWith([PageURLs.MainMenu]);
    });
  });

  describe('ngOndestroy', () => {
    let unsubscribeSpy;
    beforeEach(() => {
      unsubscribeSpy = spyOn<any>(component['subs'], 'unsubscribe');
    });
    it('should call unsubscribe', () => {
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
