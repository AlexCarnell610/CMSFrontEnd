import { TestBed } from '@angular/core/testing';

import { CullUpdateService } from './cull-update.service';

describe('CullUpdateService', () => {
  let service: CullUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CullUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
