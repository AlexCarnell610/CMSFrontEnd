import { LoadingPaneService } from './loading-pane.service';

describe('LoadingPaneService', () => {
  let service: LoadingPaneService;

  beforeEach(() => {
    service = new LoadingPaneService();
  });
  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set the next loading pane state', () => {
    expect(service.currentLoadingState.value).toBeFalse();
    service.setLoadingState(true);
    expect(service.currentLoadingState.value).toBeTrue();
  });

  it('Should increment counter if loading state is true', () => {
    service.setLoadingState(true);
    expect(service['counter']).toEqual(1);
  });

  it('should decrement counter if loading state is false', () => {
    service.setLoadingState(false);
    expect(service['counter']).toEqual(-1);
  });

  it('should return false for loading state if counter is less than or equal to 0', () => {
    service['counter'] = -1;
    service.setLoadingState(false);
    expect(service.currentLoadingState.value).toEqual(false);
  });

  it('should return true for loading state if counter is greater than zero', () => {
    service['counter'] = 1;
    service.setLoadingState(true);
    expect(service.currentLoadingState.value).toEqual(true);
  });

  it('StopLoading method should reset the laoding counter', () => {
    service['counter'] = 3;
    service.stopLoading();
    expect(service['counter']).toEqual(0);
  });
});
