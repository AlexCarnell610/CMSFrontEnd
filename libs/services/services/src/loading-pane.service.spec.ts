import { LoadingPaneService } from './loading-pane.service';

describe('LoadingPaneService', () => {
  let service: LoadingPaneService;

  beforeEach(() => {
    service = new LoadingPaneService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
