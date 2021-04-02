import { FormBuilder } from '@angular/forms';
import { CalvingAssistance, Modals } from '@cms-enums';
import { mockCalvingStat } from '@cms-testing-data';
import { Subject } from 'rxjs';
import { CalvingStatsModalComponent } from './calving-stats-modal.component';

fdescribe('CalvingStatsModalComponent', () => {
  let component: CalvingStatsModalComponent,
    formBuilder,
    mockModalService,
    mockModal,
    openEvent: Subject<any>,
    closeEvent: Subject<any>;

  let modalGetSpy;

  beforeEach(() => {
    openEvent = new Subject();
    closeEvent = new Subject();
    formBuilder = new FormBuilder();
    mockModalService = { get: () => mockModal };
    mockModal = {
      onAnyCloseEventFinished: closeEvent,
      onOpenFinished: openEvent,
      close: () => {},
    };
    component = new CalvingStatsModalComponent(formBuilder, mockModalService);
    component.stat = mockCalvingStat;
    modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
  });

  describe('ngOninit [method]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should add all the control to the form', () => {
      expect(component.isAlive).toBeTruthy();
      expect(component.calvingEase).toBeTruthy();
      expect(component.reasonPoorPres).toBeTruthy();
      expect(component.reasonBigCalf).toBeTruthy();
      expect(component.gettingUp).toBeTruthy();
      expect(component.drinkAssistance).toBeTruthy();
      expect(component.damHealth).toBeTruthy();
      expect(component.notes).toBeTruthy();
    });

    it('assist reason checkbox should be disabled initially', () => {
      expect(component.reasonBigCalf.disabled).toBeTrue();
      expect(component.reasonPoorPres.disabled).toBeTrue();
    });

    it('should set initila value of assistance reason to false', () => {
      expect(component.reasonBigCalf.value).toBeFalse();
      expect(component.reasonPoorPres.value).toBeFalse();
    });

    it('should enable the assistance reason if calving assistance is required', () => {
      component.calvingEase.setValue(CalvingAssistance.Required);
      expect(component.reasonBigCalf.enabled).toBeTrue();
      expect(component.reasonPoorPres.enabled).toBeTrue();
    });

    it('should enable the assistance reason if calving assistance is vet', () => {
      component.calvingEase.setValue(CalvingAssistance.Vet);
      expect(component.reasonBigCalf.enabled).toBeTrue();
      expect(component.reasonPoorPres.enabled).toBeTrue();
    });

    it('should disable the assistance reason and set value to false if no assistance is require', () => {
      component.reasonBigCalf.enable();
      component.reasonPoorPres.disable();
      component.reasonBigCalf.setValue(true);
      component.reasonPoorPres.setValue(true);
      component.calvingEase.setValue(CalvingAssistance.None);
      expect(component.reasonBigCalf.disabled).toBeTrue();
      expect(component.reasonPoorPres.disabled).toBeTrue();
      expect(component.reasonBigCalf.value).toBeFalse();
      expect(component.reasonPoorPres.value).toBeFalse();
    });

    it('should enable the getting up and drink assistance field if calf is alive', () => {
      component.gettingUp.disable();
      component.drinkAssistance.disable();
      component.gettingUp.setValue(5);
      component.isAlive.setValue('alive');

      expect(component.gettingUp.enabled).toBeTrue();
      expect(component.drinkAssistance.enabled).toBeTrue();
    });

    it('should disbale and reset getting up and drink assistance if calf is dead', () => {
      component.gettingUp.enable();
      component.drinkAssistance.enable();
      component.gettingUp.setValue(2);
      component.isAlive.setValue('dead');

      expect(component.gettingUp.disabled).toBeTrue();
      expect(component.drinkAssistance.disabled).toBeTrue();
      expect(component.gettingUp.value).toEqual(5);
    });

    it('shoudl set notes changed to true if notes value cahnges', () => {
      component.notes.setValue('CHANGE');
      expect(component['notesChanged']).toBeTrue();
    });

    it('should set notes changed to false if notes not changed', () => {
      component.notes.setValue('');
      expect(component['notesChanged']).toBeFalse();
    });
  });

  describe('ngAfterviewInit [method]', () => {
    let closeEventSpy, openEventSpy;
    beforeEach(() => {
      closeEventSpy = spyOn(
        mockModal.onAnyCloseEventFinished,
        'subscribe'
      ).and.callThrough();
      openEventSpy = spyOn(
        mockModal.onOpenFinished,
        'subscribe'
      ).and.callThrough();
      component.ngOnInit();
      component.ngAfterViewInit();
    });
    it('should track modal events', () => {
      expect(closeEventSpy).toHaveBeenCalled();
      expect(openEventSpy).toHaveBeenCalled();
    });

    it('shoudl reset form on close event', () => {
      component.gettingUp.setValue(1);
      component.damHealth.setValue(2);
      closeEvent.next('');

      expect(component.gettingUp.value).toEqual(5);
      expect(component.damHealth.value).toEqual(5);
    });

    it('should set form values on open evetn if stat is set', () => {
      component.stat = mockCalvingStat;
      openEvent.next('');
      let expectation = {
        easeOfCalving: mockCalvingStat.assistance,
        reasonBigCalf: true,
        reasonPoorPres: false,
        isAlive: mockCalvingStat.alive ? 'alive' : 'dead',
        gettingUp: mockCalvingStat.gettingUp,
        drinkAssistance: mockCalvingStat.drinkAssist ? 'yes' : 'no',
        damHealth: mockCalvingStat.damHealth,
        calvingNotes: mockCalvingStat.calvingNotes,
      };

      expect(component.calvingStatForm.value).toEqual(expectation);
    });

    it('should not set the stat if component stat not set', () => {
      component.stat = null;
      let expectation = {
        easeOfCalving: [],
        isAlive: [],
        gettingUp: 5,
        drinkAssistance: [],
        damHealth: 5,
        calvingNotes: [],
      };
      openEvent.next('');
      expect(component.calvingStatForm.value).toEqual(expectation);
    });
  });

  describe('save [method]', () => {
    let emitSpy, modalCloseSpy;
    beforeEach(() => {
      emitSpy = spyOn(component.statSaved, 'emit');
      modalCloseSpy = spyOn(mockModal, 'close');
      component.stat = mockCalvingStat;
      component.ngOnInit();
      component.ngAfterViewInit();
      openEvent.next('');
    });

    it('Should emit new stat if the form is valid', () => {
      component.save();
      let expectation = {
        alive: true,
        assistance: mockCalvingStat.assistance,
        assistanceReason: mockCalvingStat.assistanceReason,
        damHealth: mockCalvingStat.damHealth,
        drinkAssist: mockCalvingStat.drinkAssist,
        gettingUp: mockCalvingStat.gettingUp,
        calvingNotes: mockCalvingStat.calvingNotes,
      };
      expect(component.calvingStatForm.valid).toBeTrue();
      expect(emitSpy).toHaveBeenCalledWith(expectation);
      expect(modalCloseSpy).toHaveBeenCalled();
      expect(modalGetSpy).toHaveBeenCalledTimes(3);
    });

    it('should not emit if form is invalid', () => {
      component.calvingEase.setValue('');
      component.save();
      expect(component.calvingStatForm.invalid).toBeTrue();
      expect(emitSpy).not.toHaveBeenCalled();
      expect(modalCloseSpy).not.toHaveBeenCalled();
      expect(modalGetSpy).toHaveBeenCalledTimes(2);
    });
  });

  it('shoudl close the modal', () => {
    let closeModalSpy = spyOn(mockModal, 'close');
    component.close();
    expect(closeModalSpy).toHaveBeenCalled();
    expect(modalGetSpy).toHaveBeenCalledWith(Modals.CalvingStats);
  });

  describe('get css for drink assist [methods]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('shoudl return correct class for ivnalid', () => {
      component.drinkAssistance.setValue(null);
      component.drinkAssistance.markAsDirty();
      expect(component.getCSSForDrinkAssistNo()).toEqual([
        'btn-outline-danger',
        'invalid-label',
      ]);
      expect(component.getCSSForDrinkAssistYes()).toEqual('btn-outline-danger');
    });

    it('should return disabled if control is disabled', () => {
      component.drinkAssistance.disable();
      expect(component.getCSSForDrinkAssistNo()).toEqual('disabled');
      expect(component.getCSSForDrinkAssistYes()).toEqual('disabled');
    });

    it('should return active if selected', () => {
      component.drinkAssistance.markAsDirty();
      component.drinkAssistance.setValue('no');
      expect(component.getCSSForDrinkAssistNo()).toEqual('active');
      component.drinkAssistance.setValue('yes');
      expect(component.getCSSForDrinkAssistYes()).toEqual('active');
    });

    it('should return undeifned if not enabled and pristine', () => {
      component.drinkAssistance.enable();
      component.drinkAssistance.markAsPristine();
      expect(component.getCSSForDrinkAssistNo()).toBeUndefined();
      expect(component.getCSSForDrinkAssistYes()).toBeUndefined();
    });
  });

  describe('get css for is alive yes [method]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should reutrn active if alive and contorl is dirty', () => {
      component.isAlive.markAsDirty();
      component.isAlive.setValue('alive');
      expect(component.getCSSForIsAliveYes()).toEqual('active');
    });

    it('should reutrn danger if error and dirty', () => {
      component.isAlive.markAsDirty();
      component.isAlive.setValue('');
      expect(component.getCSSForIsAliveYes()).toEqual('btn-outline-danger');
    });

    it('should reutrn undefined if pristine', () => {
      component.isAlive.markAsPristine();
      expect(component.getCSSForIsAliveYes()).toBeUndefined();
    });
  });

  describe('get css for is alive no [method]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should reutrn active if dead and contorl is dirty', () => {
      component.isAlive.markAsDirty();
      component.isAlive.setValue('dead');
      expect(component.getCSSForIsAliveNo()).toEqual('active');
    });

    it('should reutrn danger if error and dirty', () => {
      component.isAlive.markAsDirty();
      component.isAlive.setValue('');
      expect(component.getCSSForIsAliveNo()).toEqual('btn-outline-danger');
    });

    it('should reutrn undefined if pristine', () => {
      component.isAlive.markAsPristine();
      expect(component.getCSSForIsAliveNo()).toBeUndefined();
    });
  });

  describe('getCSSForCalvingEase [method]', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Shoudl return invalid if control invalid and dirty', () => {
      component.calvingEase.setValue('');
      component.calvingEase.markAsDirty();

      expect(component.getCSSForCalvingEase()).toEqual('is-invalid');
    });

    it('Shoudl return valid if control invalid and dirty', () => {
      component.calvingEase.setValue(CalvingAssistance.None);
      component.calvingEase.markAsDirty();

      expect(component.getCSSForCalvingEase()).toEqual('is-valid');
    });

    it('Shoudl return undefined if pristine', () => {
      component.calvingEase.markAsPristine();

      expect(component.getCSSForCalvingEase()).toBeUndefined();
    });
  });
});
