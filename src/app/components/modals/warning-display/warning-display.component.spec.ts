import { Modals } from '@cms-enums';
import { IToast } from '@cms-services';
import { of } from 'rxjs';
import { WarningDisplayComponent } from './warning-display.component';

fdescribe('WarningDisplayComponent', () => {
  let component: WarningDisplayComponent,
    mockWarningService,
    mockModalService,
    mockModal,
    mockModalData;
  let modalGetSpy, modalCloseSpy, setResultSpy;

  beforeEach(() => {
    mockModalData = { data: 'I AM SOME DATA' };
    mockModal = {
      onDataAdded: of(mockModalData),
      close: () => {},
    };
    mockWarningService = { setResult: () => {} };
    mockModalService = {
      get: () => {
        return mockModal;
      },
    };
    component = new WarningDisplayComponent(
      mockWarningService,
      mockModalService
    );

    setResultSpy = spyOn(mockWarningService, 'setResult');
    modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
    modalCloseSpy = spyOn(mockModal, 'close');
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set result to true when continue clicked', () => {
    component.continueClick();
    expect(setResultSpy).toHaveBeenCalledWith(true);
    expect(modalGetSpy).toHaveBeenCalledWith(Modals.Warning);
    expect(modalCloseSpy).toHaveBeenCalled();
  });

  it('Should set the result to false if cancel clicked', () => {
    component.cancelClick();
    expect(setResultSpy).toHaveBeenCalledWith(false);
    expect(modalGetSpy).toHaveBeenCalledWith(Modals.Warning);
    expect(modalCloseSpy).toHaveBeenCalled();
  });

  it('should return danger css if toast is error', () => {
    component.toast = { isError: true } as IToast;
    expect(component.getCSSForButton()).toEqual('btn-danger');
  });

  it('should return warning css if toast is not error', () => {
    component.toast = { isError: false } as IToast;
    expect(component.getCSSForButton()).toEqual('btn-warning');
  });

  it('Should return error class if toast is error', () => {
    component.toast = { isError: true } as IToast;
    expect(component.getCSSForWarning()).toEqual('error');
  });

  it('Should return warning class if toast is not error', () => {
    component.toast = { isError: false } as IToast;
    expect(component.getCSSForWarning()).toEqual('warning');
  });

  it('Should set data to the new data', () => {
    component.ngAfterViewInit();
    expect(component.toast).toEqual(mockModalData);
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
