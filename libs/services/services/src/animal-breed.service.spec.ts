import { TestBed } from '@angular/core/testing';

import { AnimalBreedService } from './animal-breed.service';

describe('AnimalBreedService', () => {
  let service: AnimalBreedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalBreedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
