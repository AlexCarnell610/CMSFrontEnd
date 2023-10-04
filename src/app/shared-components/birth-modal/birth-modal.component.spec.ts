import { fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { AssistanceReason, CalvingAssistance, Modals } from '@cms-enums';
import { IAnimal, bull, CalvingStat } from '@cms-interfaces';
import { mockAnimal, mockCalvingStat } from '@cms-testing-data';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of } from 'rxjs';
import { BirthModalComponent } from './birth-modal.component';

describe('BirthModalComponent', () => {
  let component: BirthModalComponent;
  let mockModalService,
    mockAnimalUpdateService,
    mockStore,
    mockBreedService,
    mockWarningService,
    mockLoadingService,
    mockBull,
    mockBreedObject,
    mockBreedObject2,
    mockModal,
    mockBreed;

  beforeEach(() => {
    mockBreed = 'MockBreed';
    mockModal = {
      onAnyCloseEventFinished: of({}),
      onOpen: of({}),
      onOpenFinished: of({}),
      close: () => {},
      open: () => {},
    };
    mockBull = bull;
    mockBreedObject = { breed: 'breed', code: 'code' };
    mockBreedObject2 = { breed: 'breed2', code: 'code2' };
    mockAnimalUpdateService = {
      addAnimal: () => {
        return Promise.resolve();
      },
      updateAnimal: () => {
        return Promise.resolve();
      },
    };
    mockModalService = {
      get: () => {
        return mockModal;
      },
    };
    mockStore = {
      pipe: () => {
        return of([mockBull]);
      },
    };
    mockBreedService = {
      breedExists: () => {},
      breedCodeObjects: [mockBreedObject, mockBreedObject2],
      getCodeFromBreed: () => {
        return mockBreedObject2.breed;
      },
      getBreedFromCode: () => {
        return mockBreed;
      },
    };
    mockWarningService = {
      show: () => {
        return of({});
      },
    };
    mockLoadingService = { setLoadingState: () => {} };

    component = new BirthModalComponent(
      mockModalService,
      new UntypedFormBuilder(),
      mockAnimalUpdateService,
      mockStore,
      mockBreedService,
      mockWarningService,
      mockLoadingService
    );
    component.ngOnInit();
  });

  describe('ngOninit [method]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should populate the breeds', () => {
      expect(component.breeds).toEqual([mockBreedObject, mockBreedObject2]);
    });
    it('should set the initial sires', (done) => {
      component.$filteredSires.subscribe((sires) => {
        expect(sires).toEqual([mockBull]);
        done();
      });
    });

    it(
      'should filter sires based on enetered breed code',
      waitForAsync(() => {
        mockBull.breed = mockBreedObject.breed;
        expect(component.breeds).toEqual([mockBreedObject, mockBreedObject2]);

        component.$filteredSires.subscribe((sire) => {
          expect(sire).toEqual([mockBull]);
        });
        component.breed.setValue(mockBreedObject.breed);
      })
    );

    it(
      'should filter sires based on enetered breed string',
      waitForAsync(() => {
        mockBull.breed = mockBreedObject2.breed;
        expect(component.breeds).toEqual([mockBreedObject, mockBreedObject2]);

        component.$filteredSires.subscribe((sire) => {
          expect(sire).toEqual([mockBull]);
        });
        component.breed.setValue('breedString');
      })
    );
  });

  describe('NgAfterViewInit, [method]', () => {
    beforeEach(() => {
      component.animal = mockAnimal;
      component.ngOnInit();
    });
    it('should track modal events', () => {
      let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
      let openEventSpy = spyOn(mockModal.onOpen, 'subscribe').and.callThrough();
      let openFinishedSpy = spyOn(
        mockModal.onOpenFinished,
        'subscribe'
      ).and.callThrough();
      let closeFinishSpy = spyOn(
        mockModal.onAnyCloseEventFinished,
        'subscribe'
      ).and.callThrough();
      component.ngAfterViewInit();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Birth);
      expect(modalGetSpy).toHaveBeenCalledTimes(3);
      expect(openEventSpy).toHaveBeenCalled();
      expect(openFinishedSpy).toHaveBeenCalled();
      expect(closeFinishSpy).toHaveBeenCalled();
    });

    it('Should reset component values [edit mode]', () => {
      component.calfSelect.setValue('CALVES');
      component.sire.setValue('SIRE');
      component.ngAfterViewInit();
      expect(component.stat).toBeNull();
      expect(component.truncNotes).toEqual('');

      expect(component.birthForm.value).toEqual({
        ...component.birthForm.value,
        calves: '',
        calfSire: '',
      });
    });

    it('Should reset component values [add mode]', () => {
      component.isAdd = true;
      component.calfTag.setValue('CALFTAG');
      component.sire.setValue('SIRE');
      component.ngAfterViewInit();

      expect(component.stat).toBeNull();
      expect(component.truncNotes).toEqual('');

      expect(component.birthForm.value).toEqual({
        ...component.birthForm.value,
        calfTag: 'UK722218',
        calfSire: '',
      });
    });

    it('should enable calfTag and disable calfSelect in addMode', () => {
      component.isAdd = true;
      component.ngAfterViewInit();

      expect(component.calfTag.enabled).toBeTrue();
      expect(component.calfSelect.disabled).toBeTrue();
    });

    it('should disable calfTag and enable calfSelect in addMode', () => {
      component.isAdd = false;
      component.ngAfterViewInit();

      expect(component.calfTag.disabled).toBeTrue();
      expect(component.calfSelect.enabled).toBeTrue();
    });

    it(
      'should populate calves',
      waitForAsync(() => {
        mockStore.pipe = () => {
          return of([mockAnimal]);
        };
        component.ngAfterViewInit();
        component.$calves.subscribe((calves) => {
          expect(calves).toEqual([mockAnimal]);
        });
      })
    );
    describe('trackCalfSelect', () => {
      beforeEach(() => {
        mockStore.pipe = () => {
          return of([mockAnimal]);
        };
      });
      it(
        'should do nothing if is add is true',
        waitForAsync(() => {
          component.isAdd = true;
          let initialCalfTag = component.calfTag.value;
          let initialDOB = component.dob.value;
          let initialBreed = component.breed.value;
          let initialSire = component.sire.value;
          let initialGender = component.gender.value;
          let initialStat = component.stat;
          component.ngAfterViewInit();
          component.calfSelect.setValue(mockAnimal.tagNumber);
          component.isAdd = true;

          expect(initialCalfTag).toEqual(initialCalfTag);
          expect(initialDOB).toEqual(initialDOB);
          expect(initialBreed).toEqual(initialBreed);
          expect(initialSire).toEqual(initialSire);
          expect(initialGender).toEqual(initialGender);
          expect(initialStat).toEqual(initialStat);
        })
      );

      it(
        'should populate the form with the selected calf',
        waitForAsync(() => {
          component.ngAfterViewInit();
          component.calfSelect.setValue(mockAnimal.tagNumber);
          component.isAdd = false;

          expect(component.calfTag.value).toEqual(mockAnimal.tagNumber);
          expect(component.dob.value).toEqual(
            mockAnimal.birthDate.format('YYYY-MM-DD')
          );
          expect(component.breed.value).toEqual(mockBreed);
          expect(component.sire.value).toEqual(mockAnimal.sire.tagNumber);
          expect(component.gender.value).toEqual(mockAnimal.gender);
          expect(component.stat).toEqual(mockAnimal.calvingStat);
        })
      );

      it(
        'Should reset form if selected calf is null',
        waitForAsync(() => {
          let resetFormSpy = spyOn<any>(component, 'resetForm');
          component.ngAfterViewInit();
          component.calfSelect.setValue('CalfDoesntExist');
          component.isAdd = false;
          expect(resetFormSpy).toHaveBeenCalled();
        })
      );
    });
  });

  describe('save [method]', () => {
    let handleErrorsSpy, handlePopoverSpy, updateAnimalSpy, addAnimalSpy;
    beforeEach(() => {
      handleErrorsSpy = spyOn<any>(component, 'handleErrors');
      handlePopoverSpy = spyOn<any>(component, 'handlePopover');
      updateAnimalSpy = spyOn(
        mockAnimalUpdateService,
        'updateAnimal'
      ).and.callThrough();
      addAnimalSpy = spyOn(
        mockAnimalUpdateService,
        'addAnimal'
      ).and.callThrough();
    });
    it('should call add animal if no errors occur and addMode', fakeAsync(() => {
      handleErrorsSpy.and.returnValue(of(mockAnimal));
      component.isAdd = true;
      component.save();
      tick(500);

      expect(addAnimalSpy).toHaveBeenCalledWith(mockAnimal);
      expect(component.saveResult).toEqual({
        message: 'Calf added',
        success: true,
      });
      expect(handlePopoverSpy).toHaveBeenCalled();
    }));

    it('should update animal if no errors and edit mode', fakeAsync(() => {
      handleErrorsSpy.and.returnValue(of(mockAnimal));
      component.isAdd = false;
      component.calfSelect.setValue(mockAnimal.tagNumber);
      component.save();
      tick(500);
      expect(updateAnimalSpy).toHaveBeenCalledWith(
        mockAnimal.tagNumber,
        mockAnimal
      );
      expect(component.saveResult).toEqual({
        message: 'Calf updated',
        success: true,
      });
      expect(handlePopoverSpy).toHaveBeenCalled();
    }));

    it('Should cancel loading and not update or add a calf if animal invalid', fakeAsync(() => {
      let setLoadingSpy = spyOn(mockLoadingService, 'setLoadingState');
      handleErrorsSpy.and.returnValue(of(false));
      component.save();
      tick(500);
      expect(setLoadingSpy).toHaveBeenCalledWith(false);
      expect(updateAnimalSpy).not.toHaveBeenCalled();
      expect(addAnimalSpy).not.toHaveBeenCalled();
    }));
  });

  describe('assistReason [method]', () => {
    it('Should return correct string representation for bigCalf', () => {
      component.stat = {
        assistanceReason: [AssistanceReason.BigCalf],
      } as CalvingStat;
      expect(component.assistReason).toEqual(['Big Calf']);
    });

    it('Should return correct string representation for poorPresentation', () => {
      component.stat = {
        assistanceReason: [AssistanceReason.PoorPresentation],
      } as CalvingStat;
      expect(component.assistReason).toEqual([' Poor Presentation']);
    });

    it('Should return correct string representation for none', () => {
      component.stat = {
        assistanceReason: [AssistanceReason.NA],
      } as CalvingStat;
      expect(component.assistReason).toEqual(['None']);
    });

    it('should return array of representations if more than one', () => {
      component.stat = {
        assistanceReason: [
          AssistanceReason.BigCalf,
          AssistanceReason.PoorPresentation,
        ],
      } as CalvingStat;

      expect(component.assistReason).toEqual([
        'Big Calf',
        ' Poor Presentation',
      ]);
    });
  });

  describe('assist required [method]', () => {
    it('should return string representation of required', () => {
      component.stat = {
        assistance: CalvingAssistance.Required,
      } as CalvingStat;
      expect(component.assistRequired).toEqual('Assistance required');
    });

    it('should return string representation of vet', () => {
      component.stat = { assistance: CalvingAssistance.Vet } as CalvingStat;
      expect(component.assistRequired).toEqual('Vet required');
    });

    it('should return string representation of none', () => {
      component.stat = { assistance: CalvingAssistance.None } as CalvingStat;
      expect(component.assistRequired).toEqual('No assistance');
    });
  });

  describe('stat saved [method]', () => {
    it('should not update stat if false', () => {
      component.stat = mockCalvingStat;
      component.statSaved(false);
      expect(component.stat).toEqual(mockCalvingStat);
    });

    it('should update stat if stat provided', () => {
      expect(component.stat).toBeNull();
      component.statSaved(mockCalvingStat);
      expect(component.stat).toEqual(mockCalvingStat);
    });
    it('should set truncated notes if notes are too long', () => {
      let longNotesStat = {
        ...mockCalvingStat,
        calvingNotes: 'I AM A REALLY LONG NOTE',
      };
      expect(component.truncNotes).toEqual('');
      component.statSaved(longNotesStat);
      expect(component.truncNotes).toEqual('I AM A REALLY LONG NO...');
    });
  });

  describe('close [method]', () => {
    it('Should close the modal', () => {
      let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
      let modalCloseSpy = spyOn(mockModal, 'close');
      component.close();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.Birth);
      expect(modalCloseSpy).toHaveBeenCalled();
    });
  });

  describe('add stats [method]', () => {
    it('Should open the calving stats modal', () => {
      let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
      let modalOpenSpy = spyOn(mockModal, 'open');
      component.addStats();
      expect(modalGetSpy).toHaveBeenCalledWith(Modals.CalvingStats);
      expect(modalOpenSpy).toHaveBeenCalled();
    });
  });

  describe('get CSS for DOB [method]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should return valid class if field is valid and dirty', () => {
      let validDate = moment().subtract(3, 'days').format('YYYY-MM-DD');
      component.dob.setValue(validDate);
      component.dob.markAsDirty();
      expect(component.getCSSForDOB()).toEqual('is-valid');
    });

    it('Should return invalid class if field is invalid and dirty', () => {
      let invalidDate = moment().add(3, 'days').format('YYYY-MM-DD');
      component.dob.setValue(invalidDate);
      component.dob.markAsDirty();
      expect(component.getCSSForDOB()).toEqual('is-invalid');
    });

    it('Should return undefined if control is not dirty', () => {
      component.dob.markAsPristine();
      expect(component.getCSSForDOB()).toBeUndefined();
    });
  });

  describe('get CSS for Breed [method]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should return valid class if field is valid and dirty', () => {
      component.breed.setValue('Breed');
      mockBreedService = {
        breedExists: () => {
          return true;
        },
      };
      component.breed.markAsDirty();
      component.breed.setErrors(null);
      expect(component.getCSSForBreed()).toEqual('is-valid');
    });

    it('Should return invalid class if field is invalid and dirty', () => {
      component.breed.setValue('Invalid breed');
      mockBreedService = {
        breedExists: () => {
          return false;
        },
      };
      component.breed.markAsDirty();
      expect(component.getCSSForBreed()).toEqual('is-invalid');
    });

    it('Should return undefined if control is not dirty', () => {
      component.breed.markAsPristine();
      expect(component.getCSSForBreed()).toBeUndefined();
    });
  });

  describe('get css for calving stats [method]', () => {
    it('Should return class if user has saved but no stat set', () => {
      spyOn<any>(component, 'handleErrors').and.returnValue(of(false));
      component.save();
      component.stat = null;
      expect(component.getCSSForCalvingStats()).toEqual('invalid-label');
    });

    it('Should return null if user not saved', () => {
      component.stat = null;
      expect(component.getCSSForCalvingStats()).toEqual('');
    });

    it('Should return null if no stat set', () => {
      spyOn<any>(component, 'handleErrors').and.returnValue(of(false));
      component.save();
      component.stat = mockCalvingStat;
      expect(component.getCSSForCalvingStats()).toEqual('');
    });
  });

  describe('handle errors [method]', () => {
    describe('Add mode', () => {
      let mockPopover, handlePopoverSpy, addAnimalSpy;
      beforeEach(() => {
        addAnimalSpy = spyOn(
          mockAnimalUpdateService,
          'addAnimal'
        ).and.callThrough();
        handlePopoverSpy = spyOn<any>(component, 'handlePopover');
        mockPopover = {
          open: () => {},
          close: () => {},
        } as NgbPopover;
        component.isAdd = true;
        component.statPopover = mockPopover;
        component.stat = mockCalvingStat;
      });

      it('should show the error popover if the form is invalid', () => {
        component.save();
        expect(component.birthForm.valid).toBeFalse();
        expect(component.saveResult).toEqual({
          message: 'Please fix errors',
          success: false,
        });
        expect(handlePopoverSpy).toHaveBeenCalledWith(3000);
      });

      describe('valid form and stat exists', () => {
        let damTag = 'TagNumber',
          warningServiceShowSpy;
        beforeEach(() => {
          component.animal = { tagNumber: damTag } as IAnimal;
          component.stat = mockCalvingStat;
          mockBreedService.breedExists = () => {
            return true;
          };

          mockBreedService.getBreedCode = () => {
            return mockAnimal.breed;
          };

          warningServiceShowSpy = spyOn(
            mockWarningService,
            'show'
          ).and.callThrough();

          component.calfSelect.setValue(mockAnimal.tagNumber);
          component.calfTag.setValue(mockAnimal.tagNumber);
          component.dob.setValue(mockAnimal.birthDate.format('YYYY-MM-DD'));
          component.breed.setValue(mockAnimal.breed);
          component.sire.setValue(mockAnimal.sire.tagNumber);
          component.gender.setValue(mockAnimal.gender);
          component.registered.setValue(mockAnimal.registered);
        });
        it('form should be valid', () => {
          component.save();

          expect(component.birthForm.valid).toBeTrue();
          expect(component.stat).toBeTruthy();
        });

        it('Should output the new calf [addMode]', () => {
          component.save();
          let actualCall: IAnimal = {
            ...mockAnimal,
            managementTag: 'null',
            birthDate: moment(mockAnimal.birthDate.format('YYYY-MM-DD')),
            damTag,
          };
          expect(addAnimalSpy).toHaveBeenCalledWith(actualCall);
        });

        it('Should show warning if animal birthdate is more than 28 days ago [addMode]', () => {
          component.isAdd = true;
          component.dob.setValue(
            moment().subtract(30, 'days').format('YYYY-MM-DD')
          );
          component.dob.updateValueAndValidity();
          component.save();
          expect(warningServiceShowSpy).toHaveBeenCalledWith({
            header: 'Entered age is more than 28 days',
          });
        });

        it('should show warning if animal with same tag number already exists [addMode]', () => {
          component.isAdd = true;
          mockStore.pipe = () => {
            return of([mockAnimal]);
          };
          component.save();
          expect(warningServiceShowSpy).toHaveBeenCalledWith({
            header: `Animal with tag ${component.calfTag.value} already exists`,
            body: 'Please check the tag number and try again.',
            isError: true,
            showCloseButton: false,
            buttonText: 'Close',
          });
        });

        it('should show no changes made if no changes made [editMode]', fakeAsync(() => {
          mockStore.pipe = () => {
            return of([mockAnimal]);
          };

          component.ngAfterViewInit();
          component.isAdd = false;
          component.calfSelect.setValue(mockAnimal.tagNumber);
          component.save();
          expect(component.saveResult).toEqual({
            message: 'No changes made',
            success: false,
          });
          expect(handlePopoverSpy).toHaveBeenCalledWith(3000);
        }));
      });
    });
  });

  describe('getCSSForRegistered [method]', () => {
    it('should return outline danger if invalid and dirty', () => {
      component.registered.setValue('');
      component.registered.markAsDirty();

      expect(component.getCSSForRegisteredNo()).toEqual('btn-outline-danger');
      expect(component.getCSSForRegisteredYes()).toEqual('btn-outline-danger');
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

  describe('ngOndestroy', () => {
    let unsubscribeSpy;
    beforeEach(() => {
      unsubscribeSpy = spyOn<any>(component['longLifeSubs'], 'unsubscribe');
    });
    it('should call unsubscribe', () => {
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });
});

function printErrors(component: BirthModalComponent) {
  console.warn(component.calfSelect.errors);
  console.warn(component.dob.errors);
  console.warn(component.breed.errors);
  console.warn(component.sire.errors);
  console.warn(component.gender.errors);
  console.warn(component.calfTag.errors);
  console.warn('registered', component.registered.errors);
}
