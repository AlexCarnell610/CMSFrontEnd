import { UntypedFormBuilder } from '@angular/forms';
import { Modals } from '@cms-enums';
import { AnimalWeight } from '@cms-interfaces';
import { convertedAnimal } from '@cms-testing-data';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subject } from 'rxjs';
import { EditWeightModalComponent } from './weight-modal.component';

describe('EditWeightModalComponent', () => {
  let component: EditWeightModalComponent,
    mockModalService,
    formBuilder,
    mockLoadingService,
    mockAnimalUpdateService,
    mockWarningService,
    mockModal,
    closeEvent: Subject<any>,
    openEvent: Subject<any>;
  beforeEach(() => {
    closeEvent = new Subject();
    openEvent = new Subject();
    mockModal = {
      onAnyCloseEventFinished: closeEvent,
      onOpenFinished: openEvent,
      close: () => {},
    };
    mockModalService = {
      get: () => {
        return mockModal;
      },
    };
    formBuilder = new UntypedFormBuilder();
    mockLoadingService = { setLoadingState: () => {} };
    mockAnimalUpdateService = {
      addAnimalWeight: () => {
        return Promise.resolve();
      },
      updateAnimalWeight: () => {
        return Promise.resolve();
      },
    };
    mockWarningService = {
      show: () => {
        return of({});
      },
    };

    component = new EditWeightModalComponent(
      mockModalService,
      formBuilder,
      mockLoadingService,
      mockAnimalUpdateService,
      mockWarningService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Ngoninit [method]', () => {
    beforeEach(() => {
      component.animal = { ...convertedAnimal };
      component.ngOnInit();
    });

    it('should set up the form', () => {
      expect(component.weight).toBeTruthy();
      expect(component.date).toBeTruthy();
      expect(component.isSaleWeightControl).toBeTruthy();
      expect(component.weightSelect).toBeTruthy();
      expect(component.animalControl).toBeTruthy();
    });

    it('should mark controls as clean on weight select value changes', () => {
      component.weight.markAsDirty();
      component.date.markAsDirty();
      component.isSaleWeightControl.markAsDirty();
      component.weightSelect.setValue('');

      expect(component.date.pristine).toBeTrue();
      expect(component.weight.pristine).toBeTrue();
      expect(component.isSaleWeightControl.pristine).toBeTrue();
    });

    it('Should clear form if weight select value is empty', () => {
      component.weight.setValue('123');
      component.date.setValue('12-12-2002');
      component.isSaleWeightControl.setValue('initial');

      component.weightSelect.setValue('');

      expect(component.weight.value).toEqual('');
      expect(component.date.value).toEqual('');
      expect(component.weightSelect.value).toEqual('');
      expect(component.isSaleWeightControl.value).toEqual('');
    });

    it('Should set the form values when weight selected', () => {
      let selectedWeight = component.animal.weightData[0];
      selectedWeight.weightType = { isInitial: false, isSale: true };
      component.weightSelect.setValue(selectedWeight.id);

      expect(component.weight.value).toEqual(selectedWeight.weight);
      expect(component.date.value).toEqual(
        selectedWeight.weightDate.format('YYYY-MM-DD')
      );
      expect(component.isSaleWeightControl.value).toEqual('isSale');
    });

    describe('convertWeightType [method]', () => {
      beforeEach(() => {});
      it('Should set the weight type to initial if initial is true', () => {
        component.animal = {
          ...component.animal,
          weightData: [
            {
              weight: 120,
              weightDate: moment(),
              weightType: { isInitial: true, isSale: false },
              id: 12,
            },
          ],
        };
        component.weightSelect.setValue(component.animal.weightData[0].id);
        expect(component.isSaleWeightControl.value).toEqual('isInitial');
      });

      it('Should set the weight type to intermediate if initial and sale is false', () => {
        component.animal = {
          ...component.animal,
          weightData: [
            {
              weight: 120,
              weightDate: moment(),
              weightType: { isInitial: false, isSale: false },
              id: 12,
            },
          ],
        };
        component.weightSelect.setValue(component.animal.weightData[0].id);
        expect(component.isSaleWeightControl.value).toEqual('isIntermediate');
      });

      it('Should set the weight type to sale if initial false and sale true', () => {
        component.animal = {
          ...component.animal,
          weightData: [
            {
              weight: 120,
              weightDate: moment(),
              weightType: { isInitial: false, isSale: true },
              id: 12,
            },
          ],
        };
        component.weightSelect.setValue(component.animal.weightData[0].id);
        expect(component.isSaleWeightControl.value).toEqual('isSale');
      });
    });
  });

  describe('ngAfterViewInit [method]', () => {
    let modalGetSpy;
    beforeEach(() => {
      modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
      component.animal = convertedAnimal;
      component.ngOnInit();
      component.ngAfterViewInit();
    });

    it('should get the modal', () => {
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Weight);
    });

    describe('anyCloseEventFinished [modal event]', () => {
      it('Should clear the form', () => {
        component.weight.setValue('123');
        component.date.setValue('12-12-2002');
        component.isSaleWeightControl.setValue('initial');

        closeEvent.next('');

        expect(component.weight.value).toEqual('');
        expect(component.date.value).toEqual('');
        expect(component.weightSelect.value).toEqual('');
        expect(component.isSaleWeightControl.value).toEqual('');
      });

      it('Should set selected weight to null', () => {
        component.weightSelect.setValue(convertedAnimal.weightData[0].id);

        closeEvent.next('');
        expect(component['selectedWeight']).toBeNull();
      });
    });

    describe('onOpenFinished [modal event]', () => {
      it('Should disable weight select dropdown if in add mode', () => {
        component.isAddMode = true;
        component.weightSelect.disable();
        openEvent.next('');
        expect(component.weightSelect.disabled).toBeTrue();
      });

      it('Shoudl enable weight select dropwdown if in edit mode', () => {
        component.isAddMode = false;
        component.weightSelect.enable();
        openEvent.next('');
        expect(component.weightSelect.enabled).toBeTrue();
      });

      it('Should set the animal control value to be the animal', () => {
        openEvent.next('');
        expect(component.animalControl.value).toEqual(convertedAnimal);
      });
    });
  });

  describe('getCSSForRadio', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should return is-invalid if control is invalid and dirty', () => {
      component.isSaleWeightControl.setValue('');
      component.isSaleWeightControl.markAsDirty();

      expect(component.getCSSForRadio()).toEqual('is-invalid');
    });

    it('Should return is-valid if control is valid and dirty', () => {
      component.isSaleWeightControl.setValue('isInitial');
      component.isSaleWeightControl.markAsDirty();

      expect(component.getCSSForRadio()).toEqual('is-valid');
    });

    it('Should return nothing if control is not dirty', () => {
      component.isSaleWeightControl.markAsPristine();

      expect(component.getCSSForRadio()).toBeUndefined();
    });
  });

  describe('getCSSForDate [method]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should return is-invalid if control is invalid and dirty', () => {
      component.date.setValue(moment().add(3, 'days').format('YYYY-MM-DD'));
      component.date.markAsDirty();

      expect(component.getCSSClassForDate()).toEqual('is-invalid');
    });

    it('Should return is-valid if date is valid and control is dirty', () => {
      component.date.setValue(
        moment().subtract(2, 'days').format('YYYY-MM-DD')
      );
      component.date.markAsDirty();

      expect(component.getCSSClassForDate()).toEqual('is-valid');
    });

    it('should return nothing if control is not dirty', () => {
      component.date.markAsPristine();

      expect(component.getCSSClassForDate()).toBeUndefined();
    });
  });

  it('Should close the modal', () => {
    let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
    let modalCloseSpy = spyOn(mockModal, 'close');

    component.closeModal();

    expect(modalGetSpy).toHaveBeenCalledWith(Modals.Weight);
    expect(modalCloseSpy).toHaveBeenCalled();
  });

  describe('saveChanges [method]', () => {
    let mockPopover: NgbPopover;
    beforeEach(() => {
      mockPopover = {
        open: () => {},
        close: () => {},
      } as NgbPopover;
      component.animal = {
        ...convertedAnimal,
        weightData: [
          {
            ...convertedAnimal.weightData[0],
            weightDate: moment().subtract(2, 'days'),
            weightType: { isInitial: true, isSale: false },
          },
          { ...convertedAnimal.weightData[1] },
        ],
      };
      component.popover = mockPopover;
    });

    describe('add mode', () => {
      let handlePopoverErrorsSpy;
      beforeEach(() => {
        handlePopoverErrorsSpy = spyOn<any>(component, 'handlePopoverErrors');
        component.ngOnInit();
        component.ngAfterViewInit();
        component.isAddMode = true;
      });

      describe('No errors', () => {
        beforeEach(() => {
          handlePopoverErrorsSpy.and.returnValue(of(true));
        });

        it('should show loading spinner', () => {
          let loadingStateSpy = spyOn(mockLoadingService, 'setLoadingState');
          component.saveChanges();
          expect(loadingStateSpy).toHaveBeenCalledWith(true);
        });

        it('should add animal weight', () => {
          let addWeightSpy = spyOn(
            mockAnimalUpdateService,
            'addAnimalWeight'
          ).and.callThrough();
          let newWeight: AnimalWeight = {
            weight: 123,
            weightDate: moment().format('YYYY-MM-DD') as any,
            weightType: { isInitial: true, isSale: false },
          };
          component.weight.setValue(newWeight.weight);
          component.date.setValue(newWeight.weightDate);
          component.isSaleWeightControl.setValue('isInitial');

          component.saveChanges();

          expect(addWeightSpy).toHaveBeenCalledWith(
            convertedAnimal.tagNumber,
            newWeight
          );
        });

        it('should stop loading and show success message', async () => {
          let loadingStateSpy = spyOn(mockLoadingService, 'setLoadingState');
          let popoverOpenSpy = spyOn(mockPopover, 'open');
          spyOn(mockAnimalUpdateService, 'addAnimalWeight').and.callThrough();

          component.weight.setValue(123);
          component.date.setValue(moment().format('YYYY-MM-DD'));
          component.isSaleWeightControl.setValue('isInitial');

          await component.saveChanges();

          expect(loadingStateSpy).toHaveBeenCalledWith(true);
          expect(loadingStateSpy).toHaveBeenCalledWith(false);
          expect(popoverOpenSpy).toHaveBeenCalled();
        });
      });

      describe('has errors', () => {
        beforeEach(() => {
          handlePopoverErrorsSpy.and.returnValue(of(false));
        });

        it('should not add animal', () => {
          let addWeightSpy = spyOn(
            mockAnimalUpdateService,
            'addAnimalWeight'
          ).and.callThrough();
          component.saveChanges();
          expect(addWeightSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('edit mode', () => {
      let handlePopoverErrorsSpy;
      beforeEach(() => {
        handlePopoverErrorsSpy = spyOn<any>(component, 'handlePopoverErrors');
        component.ngOnInit();
        component.ngAfterViewInit();
        component.isAddMode = false;
        component.animal = convertedAnimal;
        openEvent.next('');
      });

      describe('No errors', () => {
        beforeEach(() => {
          handlePopoverErrorsSpy.and.returnValue(of(true));
        });

        it('should show loading spinner', () => {
          component.weightSelect.setValue(convertedAnimal.weightData[0].id);
          let loadingStateSpy = spyOn(mockLoadingService, 'setLoadingState');
          component.saveChanges();
          expect(loadingStateSpy).toHaveBeenCalledWith(true);
        });

        it('should send animal weight update', () => {
          component.weightSelect.setValue(convertedAnimal.weightData[0].id);
          let updateWeightSpy = spyOn(
            mockAnimalUpdateService,
            'updateAnimalWeight'
          ).and.callThrough();

          let newWeight = {
            weight: 123,
            date: moment().format('YYYY-MM-DD') as any,
            isInitial: true,
            isSale: false,
          };
          component.weight.setValue(newWeight.weight);
          component.date.setValue(newWeight.date);
          component.isSaleWeightControl.setValue('isInitial');

          component.saveChanges();

          expect(updateWeightSpy).toHaveBeenCalledWith(
            convertedAnimal.weightData[0].id,
            newWeight,
            convertedAnimal
          );
        });

        it('should stop loading and show success message', async () => {
          let loadingStateSpy = spyOn(mockLoadingService, 'setLoadingState');
          let popoverOpenSpy = spyOn(mockPopover, 'open');

          component.weightSelect.setValue(convertedAnimal.weightData[0].id);
          component.weight.setValue(123);
          component.date.setValue(moment().format('YYYY-MM-DD'));
          component.isSaleWeightControl.setValue('isInitial');

          await component.saveChanges();

          expect(loadingStateSpy).toHaveBeenCalledWith(true);
          expect(loadingStateSpy).toHaveBeenCalledWith(false);
          expect(popoverOpenSpy).toHaveBeenCalled();
        });
      });
      describe('has errors', () => {
        beforeEach(() => {
          handlePopoverErrorsSpy.and.returnValue(of(false));
        });

        it('should not add animal', () => {
          let addWeightSpy = spyOn(
            mockAnimalUpdateService,
            'addAnimalWeight'
          ).and.callThrough();
          component.saveChanges();
          expect(addWeightSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('handle popover errors [method]', () => {
      let handlePopoverSpy, popoverOpenSpy;
      beforeEach(() => {
        handlePopoverSpy = spyOn<any>(
          component,
          'handlePopover'
        ).and.callThrough();
        popoverOpenSpy = spyOn(mockPopover, 'open');
        component.ngOnInit();
        component.ngAfterViewInit();
      });

      it('should show no changes made popover [edit mode]', () => {
        let selectedWeight = component.animal.weightData[0];
        component.isAddMode = false;
        component.weight.setValue(selectedWeight.weight);
        component.weightSelect.setValue(selectedWeight.id);
        component.date.setValue(selectedWeight.weightDate.format('YYYY-MM-DD'));
        component.isSaleWeightControl.setValue('isInitial');

        component.saveChanges();

        expect(component.saveResult.message).toEqual('No changes made');
        expect(component.saveResult.success).toBeFalse();
        expect(handlePopoverSpy).toHaveBeenCalledWith(3000);
        expect(popoverOpenSpy).toHaveBeenCalled();
      });

      it('should not show popover if values are edited [edit mode]', () => {
        component.weightSelect.setValue(convertedAnimal.weightData[0].id);
        component.weight.setValue(convertedAnimal.weightData[0].weight + 50);

        component.saveChanges();

        expect(handlePopoverSpy).not.toHaveBeenCalled();
      });

      it('should show weight recorded on day warning', () => {
        let selectedWeight = component.animal.weightData[0];
        let warningServiceShowSpy = spyOn(
          mockWarningService,
          'show'
        ).and.callThrough();
        component.isAddMode = true;
        component.weight.setValue(selectedWeight.weight);
        component.weightSelect.setValue(selectedWeight.id);
        component.date.setValue(selectedWeight.weightDate.format('YYYY-MM-DD'));

        component.saveChanges();

        expect(warningServiceShowSpy).toHaveBeenCalledWith({
          header: 'There is already a weight recorded on that day',
        });
      });

      it('should not show an error if weight date is unique and within 2 months of today', () => {
        let selectedWeight = convertedAnimal.weightData[0];
        let warningServiceShowSpy = spyOn(
          mockWarningService,
          'show'
        ).and.callThrough();
        component.isAddMode = true;
        component.weight.setValue(selectedWeight.weight);
        component.weightSelect.setValue(selectedWeight.id);
        component.date.setValue(moment().format('YYYY-MM-DD'));

        component.saveChanges();

        expect(warningServiceShowSpy).not.toHaveBeenCalled();
      });

      it('Should show weight date not wihtin 2 months warning', () => {
        let selectedWeight = convertedAnimal.weightData[0];
        let warningServiceShowSpy = spyOn(
          mockWarningService,
          'show'
        ).and.callThrough();
        component.isAddMode = true;
        component.weight.setValue(selectedWeight.weight);
        component.weightSelect.setValue(selectedWeight.id);
        component.date.setValue(
          moment().subtract(3, 'month').format('YYYY-MM-DD')
        );

        component.saveChanges();
        expect(warningServiceShowSpy).toHaveBeenCalledWith({
          header: `The date you entered is more than 2 months ago.`,
        });
      });

      it('should show error popover if form not valid', () => {
        component.isAddMode = true;
        component.weight.setValue(1);

        component.saveChanges();

        expect(component.saveResult).toEqual({
          message: 'Please fix errors',
          success: false,
        });
        expect(handlePopoverSpy).toHaveBeenCalledWith(3000);
        expect(popoverOpenSpy).toHaveBeenCalled();
      });
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
