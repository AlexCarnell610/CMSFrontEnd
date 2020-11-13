import { Injectable } from '@angular/core';
import { HttpService } from '@cms-services/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadingPaneService } from 'libs/services/services/src/loading-pane.service';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  AnimalActionTypes,
  LoadAnimalData,
  LoadAnimalsFinished
} from '../../actions/src/animal.actions';

@Injectable()
export class AnimalEffects {
  constructor(
    private actions$: Actions,
    private readonly httpService: HttpService,
    private loadingPaneService: LoadingPaneService
  ) {
    actions$.pipe(tap((action) => console.error(action)));
  }

  $retrieveData = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActionTypes.RetrieveAnimalDataType),
      switchMap(() => {
        this.loadingPaneService.loadingState = true;
        return this.httpService.getOfflineData().pipe(
          map((animals) => {
            // console.error("IN EFFECT",animals);
            return new LoadAnimalData({ animals });
          })
        );
      })
    )
  );

  $loadData = createEffect(()=> this.actions$.pipe(ofType(AnimalActionTypes.LoadAnimalDataType), switchMap(() => {
    this.loadingPaneService.loadingState = false;
    return of(new LoadAnimalsFinished());
  })))
}
