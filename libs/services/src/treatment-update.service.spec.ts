import { TestBed } from '@angular/core/testing';

import { TreatmentUpdateService } from './treatment-update.service';

describe('TreatmentUpdateService', () => {
  let service: TreatmentUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
