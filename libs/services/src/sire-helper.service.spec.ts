import { TestBed } from '@angular/core/testing';

import { SireHelperService } from './sire-helper.service';

describe('SireHelperService', () => {
  let service: SireHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SireHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
