import { Injectable } from '@angular/core';
import { HttpService } from '@cms-services/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoadingPaneService } from '../../../../services/src/loading-pane.service';
import {
  AnimalActionTypes,
  HTTPError,
  LoadAnimalData,
  LoadAnimalsFinished,
} from './animal.actions';

@Injectable()
export class AnimalEffects {
  constructor(
    private actions$: Actions,
    private readonly httpService: HttpService,
    private loadingPaneService: LoadingPaneService
  ) {
    actions$.pipe(tap((action) => console.error(action)));
  }

  $retrieveAnimalData = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActionTypes.RetrieveAnimalDataType),
      switchMap(() => {
        this.loadingPaneService.setLoadingState(true);
        return this.httpService.getAnimalData().pipe(
          map((animals) => {
            return new LoadAnimalData({ animals });
          }),
          catchError((err) => {
            return of(new HTTPError({ error: err }));
          })
        );
      })
    )
  );

  $loadData = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActionTypes.LoadAnimalDataType),
      switchMap(() => {
        this.loadingPaneService.setLoadingState(false);
        return of(new LoadAnimalsFinished());
      })
    )
  );

  $httpError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AnimalActionTypes.HTTPErrorType),
        map((action: any) => {
          this.loadingPaneService.stopLoading();
          alert('An error has occured. Please try again later');
          console.error('An error has occured', action.payload);
        })
      ),
    { dispatch: false }
  );
}
