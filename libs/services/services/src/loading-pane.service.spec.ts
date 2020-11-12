import { TestBed } from '@angular/core/testing';

import { LoadingPaneService } from './loading-pane.service';

describe('LoadingPaneService', () => {
  let service: LoadingPaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingPaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
