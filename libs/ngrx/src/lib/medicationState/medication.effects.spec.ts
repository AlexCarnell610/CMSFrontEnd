import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MedicationEffects } from './medication.effects';

describe('MedicationEffects', () => {
  let actions$: Observable<any>;
  let effects: MedicationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MedicationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MedicationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
