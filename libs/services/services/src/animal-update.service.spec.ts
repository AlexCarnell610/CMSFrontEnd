import { TestBed } from '@angular/core/testing';

import { AnimalUpdateService } from './animal-update.service';

describe('AnimalUpdateService', () => {
  let service: AnimalUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
