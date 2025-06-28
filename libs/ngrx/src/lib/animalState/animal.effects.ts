import { Inject, Injectable } from '@angular/core';
import { Animal, IAnimal } from '@cms-interfaces';
import { HttpService } from '@cms-services/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import * as moment from 'moment';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoadingPaneService } from '../../../../services/src/loading-pane.service';
import {
  AddManyWeights,
  AnimalActionTypes,
  DeleteWeight,
  DeleteWeightSuccess,
  HTTPError,
  LoadAnimalData,
  LoadAnimalsFinished,
  UpdateManyAnimals,
} from './animal.actions';

@Injectable()
export class AnimalEffects {
  constructor(
    private actions$: Actions,
    private readonly httpService: HttpService,
    private loadingPaneService: LoadingPaneService
  ) {
    // actions$.pipe(tap((action) => console.error(action)));
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

  $addManyWeights = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActionTypes.AddManyWeightsType),
      switchMap((action: AddManyWeights) => {
        this.loadingPaneService.setLoadingState(true);
        return this.httpService.addManyWeights(action.payload.weights).pipe(
          map((updatedWeights) => {
            const animalUpdates: Update<Animal>[] = updatedWeights.map(weight => {
              return {
                id: weight[0].tag,
                changes: {weightData: weight}
              }
            })
            this.loadingPaneService.setLoadingState(false)
            return new UpdateManyAnimals(animalUpdates);
          })
        );
      })
    )
  );

  $deleteWeight = createEffect(() => this.actions$.pipe(
    ofType(AnimalActionTypes.DeleteWeight),
    switchMap((action: DeleteWeight) => {
      this.loadingPaneService.setLoadingState(true);
      return this.httpService.deleteWeight(action.payload.weightID).pipe(map(weights => {
        this.loadingPaneService.setLoadingState(false)
        const payload: Update<IAnimal> = {
          id: action.payload.animalID,
          changes: {
            weightData: weights
          }
        }
        return new DeleteWeightSuccess({animal: payload})
      }))
    })
  ))

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
