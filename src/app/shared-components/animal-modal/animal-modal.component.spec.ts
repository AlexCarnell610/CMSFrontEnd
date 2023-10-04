import { fakeAsync, tick } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { Gender, Modals } from '@cms-enums';
import { IAnimal, bull } from '@cms-interfaces';
import { AnimalBreedService } from '@cms-services';
import { convertedAnimal, mockAnimal } from '@cms-testing-data';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subject } from 'rxjs';
import { AnimalModalComponent } from './animal-modal.component';

describe('AnimalModalComponent', () => {
  let component: AnimalModalComponent,
    formBuilder,
    mockStore,
    mockModalService,
    mockAnimalUpdateService,
    mockLoading,
    mockWarningService,
    mockModal,
    breedService: AnimalBreedService,
    closeEvent: Subject<any>,
    openEvent: Subject<any>;

  let breedCodeObjectsSpy, storePipeSpy;

  beforeEach(() => {
    closeEvent = new Subject();
    openEvent = new Subject();
    formBuilder = new UntypedFormBuilder();
    mockStore = {
      pipe: () => {},
    };
    mockModal = {
      onAnyCloseEventFinished: closeEvent,
      onOpenFinished: openEvent,
      close: () => {},
      open: () => {},
    };
    mockModalService = {
      get: () => {
        return mockModal;
      },
    };
    mockAnimalUpdateService = {
      addAnimal: () => {
        return Promise.resolve();
      },
      updateAnimal: () => {
        return Promise.resolve();
      },
    };
    mockLoading = { setLoadingState: () => {} };
    mockWarningService = { show: () => {} };
    breedService = new AnimalBreedService();

    component = new AnimalModalComponent(
      formBuilder,
      mockStore,
      mockModalService,
      mockAnimalUpdateService,
      mockLoading,
      mockWarningService,
      breedService
    );

    storePipeSpy = spyOn(mockStore, 'pipe').and.returnValues(
      of([convertedAnimal]),
      of([bull]),
      of([convertedAnimal, mockAnimal])
    );
    breedCodeObjectsSpy = spyOnProperty(
      breedService,
      'breedCodeObjects',
      'get'
    ).and.callThrough();
    component.ngOnInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOninit [method]', () => {
    it('should set up the form', () => {
      expect(component.tagNumber).toBeTruthy();
      expect(component.tagNumber.value).toEqual(['UK']);
      expect(component.gender).toBeTruthy();
      expect(component.dob).toBeTruthy();
      expect(component.breed.updateOn).toEqual('blur');
      expect(component.dam.value).toEqual(['UK']);
      expect(component.dam.updateOn).toEqual('blur');
      expect(component.sire.value).toEqual(['UK']);
      expect(component.sire.updateOn).toEqual('blur');
    });

    it('should set the breedlist', () => {
      expect(breedCodeObjectsSpy).toHaveBeenCalled();
      expect(component.breedsList).toEqual(breedService.breedCodeObjects);
    });

    it('Should retrieve data from the store', () => {
      expect(storePipeSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('ngAfterViewInit [method]', () => {
    let modalGetSpy, modalCloseEventSpy, modalOpenEventSpy, formResetSpy;
    beforeEach(() => {
      component.animal = convertedAnimal;
      formResetSpy = spyOn(component.animalForm, 'reset');
      modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
      modalCloseEventSpy = spyOn(
        mockModal.onAnyCloseEventFinished,
        'subscribe'
      ).and.callThrough();
      modalOpenEventSpy = spyOn(
        mockModal.onOpenFinished,
        'subscribe'
      ).and.callThrough();
      component.ngAfterViewInit();
    });

    it('should lsiten to modal events', () => {
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Animal);
      expect(modalCloseEventSpy).toHaveBeenCalled();
      expect(modalOpenEventSpy).toHaveBeenCalled();
    });

    it('should clear form when close event triggered', () => {
      closeEvent.next('event');
      expect(formResetSpy).toHaveBeenCalled();
    });

    it('should set form data in edit mode and enable the form', () => {
      component.isAddMode = false;
      openEvent.next('event');
      let expectation = {
        newTagNumber: ['UK'],
        gender: convertedAnimal.gender.toString(),
        dob: convertedAnimal.birthDate.format('yyyy-MM-DD'),
        breed: breedService.getBreedFromCode(convertedAnimal.breed),
        dam: convertedAnimal.dam.tagNumber,
        sire: 'No sire assigned',
        registered: convertedAnimal.registered ? 'yes' : 'no',
      };
      expect(component.animalForm.enabled).toBeTrue();
      expect(component.animalForm.value).toEqual(expectation);
    });

    it('should not set the form value if in add mode', () => {
      component.isAddMode = true;
      openEvent.next('event');
      let expectation = {
        newTagNumber: ['UK'],
        gender: [],
        dob: [],
        breed: [],
        dam: ['UK'],
        sire: ['UK'],
        registered: [],
      };
      expect(component.animalForm.enabled).toBeTrue();
      expect(component.animalForm.value).toEqual(expectation);
    });
  });

  describe('save [method]', () => {
    let handleErrorsSpy, handlePopoverSpy, loadingStateSpy;

    beforeEach(() => {
      component.popover = {
        popoverClass: '',
        ngbPopover: '',
        open: () => {},
        close: () => {},
      } as NgbPopover;

      handleErrorsSpy = spyOn<any>(component, 'handlePopoverErrors');
      loadingStateSpy = spyOn(mockLoading, 'setLoadingState');
      component.animal = convertedAnimal;
      component.ngAfterViewInit();
    });

    describe('No errors', () => {
      let mockFormValue;
      beforeEach(() => {
        handlePopoverSpy = spyOn<any>(component, 'handlePopover');
        mockFormValue = {
          newTagNumber: 'newTag',
          gender: 'M',
          dob: '2021-03-30',
          breed: 'LIM',
          dam: convertedAnimal.dam.tagNumber,
          sire: convertedAnimal.sire.tagNumber,
          registered: 'yes',
        };
        component.animalForm.setValue(mockFormValue);
        handleErrorsSpy.and.returnValue(of(true));
      });

      describe('addMode', () => {
        let animalServiceAddAnimalSpy;
        beforeEach(async () => {
          component.isAddMode = true;

          animalServiceAddAnimalSpy = spyOn(
            mockAnimalUpdateService,
            'addAnimal'
          ).and.callThrough();

          openEvent.next('');
          await component.save();
        });
        it('should set the loading state', () => {
          expect(loadingStateSpy).toHaveBeenCalledWith(true);
        });

        it('should call add animal on add animal service', () => {
          let newAnimal: IAnimal = {
            ai: [],
            birthDate: mockFormValue.dob,
            calvingHistory: [],
            dam: mockFormValue.dam,
            gender: mockFormValue.gender,
            managementTag: 'null',
            sire: { tagNumber: mockFormValue.sire },
            tagNumber: mockFormValue.newTagNumber,
            weightData: [],
            breed: mockFormValue.breed,
            registered: mockFormValue.registered === 'yes',
          };

          expect(animalServiceAddAnimalSpy).toHaveBeenCalledWith(newAnimal);
        });

        it('should display the save result', () => {
          expect(component.saveResult).toEqual({
            message: 'Animal Saved',
            success: true,
          });
          expect(handlePopoverSpy).toHaveBeenCalledWith(1000);
        });

        it('should stop loading', () => {
          expect(loadingStateSpy).toHaveBeenCalledWith(true);
          expect(loadingStateSpy).toHaveBeenCalledWith(false);
        });

        it('should reset the form', () => {
          let expectation = {
            newTagNumber: 'UK',
            gender: null,
            dob: null,
            breed: null,
            dam: 'UK',
            sire: 'UK',
            registered: null,
          };
          expect(component.animalForm.value).toEqual(expectation);
        });
      });

      describe('Edit mode', () => {
        let editAnimalSpy;
        beforeEach(async () => {
          editAnimalSpy = spyOn(
            mockAnimalUpdateService,
            'updateAnimal'
          ).and.callThrough();

          component.isAddMode = false;
          openEvent.next('');
          component.animalForm.setValue(mockFormValue);
          await component.save();
        });

        it('should set the loading state', () => {
          expect(loadingStateSpy).toHaveBeenCalledWith(true);
        });

        it('should update animal', () => {
          let expectation = {
            birthDate: mockFormValue.dob,
            dam: mockFormValue.dam,
            sire: { tagNumber: mockFormValue.sire },
            gender: mockFormValue.gender,
            breed: mockFormValue.breed,
            registered: mockFormValue.registered == 'yes',
          };
          expect(editAnimalSpy).toHaveBeenCalledWith(
            convertedAnimal.tagNumber,
            expectation
          );
        });

        it('should set the success result', () => {
          expect(component.saveResult).toEqual({
            message: 'Animal Updated',
            success: true,
          });
          expect(handlePopoverSpy).toHaveBeenCalledWith(1000);
        });

        it('shoudl stop laoding', () => {
          expect(loadingStateSpy).toHaveBeenCalledWith(true);
          expect(loadingStateSpy).toHaveBeenCalledWith(false);
        });
      });
    });

    describe('HandlePopoverErrors [method]', () => {
      let warningServiceShowSpy, addAnimalSpy;
      beforeEach(() => {
        handlePopoverSpy = spyOn<any>(component, 'handlePopover');
        warningServiceShowSpy = spyOn(
          mockWarningService,
          'show'
        ).and.returnValue(of());
        addAnimalSpy = spyOn(
          mockAnimalUpdateService,
          'addAnimal'
        ).and.callThrough();
        component.isAddMode = false;
        openEvent.next('');
        handleErrorsSpy.and.callThrough();
      });
      it('should set the warngin if no changes have been made', () => {
        component.save();
        expect(component.saveResult.message).toEqual('No changes made');
        expect(component.saveResult.success).toEqual(false);
        expect(handlePopoverSpy).toHaveBeenCalledWith(3000);
      });

      it('should show a warnign if dam doesnt exist and add dam if continue is true', fakeAsync(() => {
        let damTag = 'UK111111222222';
        let newDam: IAnimal = {
          ai: [],
          birthDate: moment(),
          calvingHistory: [],
          dam: null,
          gender: Gender.Female,
          managementTag: 'null',
          sire: null,
          tagNumber: damTag,
          weightData: [],
          breed: 'UNAV',
          registered: false,
        };

        component.dam.setValue(damTag);
        warningServiceShowSpy.and.returnValue(of(true));
        component.save();
        tick();
        expect(warningServiceShowSpy).toHaveBeenCalled();
        expect(addAnimalSpy).toHaveBeenCalledWith(newDam);
      }));

      it('should show a warnign if dam doesnt exist and not add dam if continue is true', fakeAsync(() => {
        let damTag = 'UK111111222222';
        component.dam.setValue(damTag);
        warningServiceShowSpy.and.returnValue(of(false));
        component.save();
        tick();

        expect(warningServiceShowSpy).toHaveBeenCalled();
        expect(addAnimalSpy).not.toHaveBeenCalled();
      }));

      it('should show dam tag is male warngin and edit animal', fakeAsync(() => {
        let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
        let modalOpenSpy = spyOn(mockModal, 'open');
        component.dam.setValue(mockAnimal.tagNumber);
        warningServiceShowSpy.and.returnValue(of(true));
        component.sire.setValue('');
        component.save();
        tick();
        expect(warningServiceShowSpy).toHaveBeenCalledWith({
          header: 'The animal entered for the dam is male',
          body: 'Please edit it to continue',
          buttonText: 'Go to edit',
          isError: true,
        });
        expect(modalGetSpy).toHaveBeenCalledWith(Modals.Animal);
        expect(modalOpenSpy).toHaveBeenCalled();
      }));

      it('should show dam tag is male warngin and not edit animal', fakeAsync(() => {
        let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
        let modalOpenSpy = spyOn(mockModal, 'open');
        component.dam.setValue(mockAnimal.tagNumber);
        warningServiceShowSpy.and.returnValue(of(false));
        component.save();
        tick();
        expect(warningServiceShowSpy).toHaveBeenCalledWith({
          header: 'The animal entered for the dam is male',
          body: 'Please edit it to continue',
          buttonText: 'Go to edit',
          isError: true,
        });
        expect(modalGetSpy).not.toHaveBeenCalled();
        expect(modalOpenSpy).not.toHaveBeenCalled();
      }));

      it('shoudl show warning if the form is not valid', () => {
        component.breed.setValue('DOESTN EXIST');
        component.sire.setValue('UK');
        component.save();
        expect(component.saveResult.message).toEqual('Please fix errors');
        expect(component.saveResult.success).toBeFalse();
        expect(handlePopoverSpy).toHaveBeenCalledWith(3000);
      });

      it('should not disable the tagnumber control if in add mode', () => {
        component.isAddMode = true;
        component.save();
        expect(component.tagNumber.enabled).toBeTrue();
      });
    });

    describe('handlePopover [method]', () => {
      let popoverOpenSpy, popoverCloseSpy;
      beforeEach(() => {
        popoverCloseSpy = spyOn(component.popover, 'close');
        popoverOpenSpy = spyOn(component.popover, 'open');
        handleErrorsSpy.and.callThrough();
        component.isAddMode = false;
        openEvent.next('');
      });

      it('Should open the popover', fakeAsync(() => {
        component.save();
        tick(3000);
        expect(popoverOpenSpy).toHaveBeenCalled();
        expect(popoverCloseSpy).toHaveBeenCalled();
      }));

      it('should close the modal if no previous value', fakeAsync(() => {
        let closeModalSpy = spyOn(component, 'closeModal');
        handleErrorsSpy.and.returnValue(of(true));
        component.save();
        tick(3000);
        expect(popoverOpenSpy).toHaveBeenCalled();
        expect(popoverCloseSpy).toHaveBeenCalled();
        expect(closeModalSpy).toHaveBeenCalled();
      }));
    });
  });

  describe('get css methods', () => {
    let currentDate: moment.Moment;
    beforeEach(() => {
      currentDate = moment();
      component.ngOnInit();
    });
    describe('getCSSClassForDOB [method]', () => {
      it('Should return isvalid is control is dirty and valid', () => {
        component.dob.setValue(
          currentDate.add(-2, 'days').format('yyyy-MM-DD')
        );
        component.dob.markAsDirty();
        expect(component.getCSSClassForDOB()).toEqual('is-valid');
      });

      it('should return nothing if contorl is not dirt', () => {
        component.dob.setValue(
          currentDate.add(-2, 'days').format('yyyy-MM-DD')
        );
        component.dob.markAsPristine();
        expect(component.getCSSClassForDOB()).toBeUndefined();
      });

      it('should return isinvalid if contorl is invlaid and dirty', () => {
        component.dob.setValue(
          currentDate.add(50, 'days').format('yyyy-MM-DD')
        );
        component.dob.markAsDirty();
        expect(component.getCSSClassForDOB()).toEqual('is-invalid');
      });
    });

    describe('getCSSForBreed [method]', () => {
      it('should return valid if breed is valid and contorl is dirty', () => {
        component.breed.setValue('LIM');
        component.breed.markAsDirty();
        expect(component.getCSSClassForBreed()).toEqual('is-valid');
      });

      it('should return nothing if control is not dirty', () => {
        component.breed.markAsPristine();
        expect(component.getCSSClassForBreed()).toBeUndefined();
      });

      it('should reutrn is invaldi if breed is invalid', () => {
        component.breed.setValue('INVALID');
        component.breed.markAsDirty();
        expect(component.getCSSClassForBreed()).toEqual('is-invalid');
      });
    });

    describe('getCSSForRegistered [method]', () => {
      it('should return outline danger if invalid and dirty', () => {
        component.registered.setValue('');
        component.registered.markAsDirty();

        expect(component.getCSSForRegisteredNo()).toEqual('btn-outline-danger');
        expect(component.getCSSForRegisteredYes()).toEqual(
          'btn-outline-danger'
        );
      });

      it('should return active if button is clicked', () => {
        component.registered.setValue('yes');
        expect(component.getCSSForRegisteredYes()).toEqual('active');
        expect(component.getCSSForRegisteredNo()).toBeUndefined();
        component.registered.setValue('no');
        expect(component.getCSSForRegisteredNo()).toEqual('active');
        expect(component.getCSSForRegisteredYes()).toBeUndefined();
      });

      it('should return undeifned if not dirty and invalid', () => {
        component.registered.markAsPristine();
        expect(component.getCSSForRegisteredYes()).toBeUndefined();
        expect(component.getCSSForRegisteredNo()).toBeUndefined();
      });
    });
  });

  describe('Close modal [method]', () => {
    it('should close the modal', () => {
      let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
      let modalCloseSpy = spyOn(mockModal, 'close');
      component.closeModal();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Animal);
      expect(modalCloseSpy).toHaveBeenCalled();
    });
  });
});

function printAll(component) {
  console.warn(component.tagNumber.errors, 'tagnumber');
  console.warn(component.gender.errors, 'gender');
  console.warn(component.breed.errors, 'breed');
  console.warn(component.dam.errors, 'dam');
  console.warn(component.sire.errors, 'sire');
  console.warn(component.dob.errors, 'dob');
}
