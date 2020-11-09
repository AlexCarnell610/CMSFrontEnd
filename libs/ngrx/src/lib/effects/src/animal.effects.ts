import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnimalActionTypes, LoadAnimalDataSuccess } from '../../actions/src/animal.actions';

@Injectable()
export class AnimalEffects {
  constructor(private actions$: Actions) { }
    loadAnimals$ = createEffect(() =>
      this.actions$.pipe(ofType(AnimalActionTypes.LoadAnimalDataType), 
        switchMap(() => {
            console.error("HOORAY");
            
            
            return of(new LoadAnimalDataSuccess([1]))
        }))
    );
}
