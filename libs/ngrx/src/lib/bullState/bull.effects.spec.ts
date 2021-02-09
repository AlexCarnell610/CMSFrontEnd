import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BullEffects } from './bull.effects';

describe('BullEffects', () => {
  let actions$: Observable<any>;
  let effects: BullEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BullEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BullEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
