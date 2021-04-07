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
});
