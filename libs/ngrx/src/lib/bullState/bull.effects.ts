import { Injectable } from '@angular/core';
import { LoadingPaneService } from '@cms-services';
import { HttpService } from '@cms-services/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import {
  AddBull,
  BullActionTypes,
  LoadBull,
  LoadBulls,
  LoadBullsFinished,
  UpdateBull,
  UpdateBullFinished,
} from './bull.actions';

@Injectable()
export class BullEffects {
  constructor(
    private actions$: Actions,
    private readonly loadingService: LoadingPaneService,
    private readonly httpService: HttpService
  ) {}

  $retrieveBullData = createEffect(() =>
    this.actions$.pipe(
      ofType(BullActionTypes.RetrieveBulls),
      switchMap(() => {
        this.loadingService.setLoadingState(true);
        return this.httpService.getBullData().pipe(
          map((bulls) => {
            return new LoadBulls({ bulls });
          })
        );
      })
    )
  );

  $loadBulls = createEffect(() =>
    this.actions$.pipe(
      ofType(BullActionTypes.LoadBulls),
      map(() => {
        this.loadingService.setLoadingState(false);
        return new LoadBullsFinished();
      })
    )
  );

  $addBull = createEffect(() =>
    this.actions$.pipe(
      ofType(BullActionTypes.AddBull),
      switchMap((action: AddBull) => {
        return this.httpService
          .addBull(action.payload.bull)
          .pipe(map((bull) => new LoadBull({ bull })));
      })
    )
  );

  $updateBull = createEffect(() =>
    this.actions$.pipe(
      ofType(BullActionTypes.UpdateBull),
      switchMap((action: UpdateBull) =>{
        const payloadBull = action.payload.bull
       return  this.httpService
          .updateBull(payloadBull.changes, '' + payloadBull.id)
          .pipe(map((bull) => new UpdateBullFinished({bull: {id: ""+payloadBull.id, changes: bull}})))
      }
      )
    )
  );
}
