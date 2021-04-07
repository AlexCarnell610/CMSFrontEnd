import { fakeAsync, tick } from '@angular/core/testing';
import { Modals } from '@cms-enums';
import { IToast, WarningService } from './warning.service';

describe('WarningService', () => {
  let service: WarningService, mockModalService, mockModal, mockToast: IToast;

  beforeEach(() => {
    mockToast = {
      header: 'mockHeader',
      body: 'mockBody',
      buttonText: 'mockButtonText',
      isError: true,
      showCloseButton: true,
    };

    mockModal = {
      setData: () => {
        return mockModal;
      },
      open: () => {},
    };
    mockModalService = {
      get: () => {
        return mockModal;
      },
    };
    service = new WarningService(mockModalService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set data and open the warning modal', () => {
    let modalGetSpy = spyOn(mockModalService, 'get').and.callThrough();
    let modalSetDataSpy = spyOn(mockModal, 'setData').and.callThrough();
    let modalOpenSpy = spyOn(mockModal, 'open');

    service.show(mockToast);
    expect(modalGetSpy).toHaveBeenCalledWith(Modals.Warning);
    expect(modalSetDataSpy).toHaveBeenCalledWith({
      ...mockToast,
      animal: null,
    });
    expect(modalOpenSpy).toHaveBeenCalled();
  });

  it('should return the result', fakeAsync(() => {
    let expectation;
    service.show({ ...mockToast, animal: null }).subscribe((result) => {
      expectation = result;
    });
    service.setResult(true);
    tick();
    expect(expectation).toBeTrue();
  }));
});
