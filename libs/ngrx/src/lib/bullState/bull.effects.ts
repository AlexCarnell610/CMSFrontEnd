import { Injectable } from '@angular/core';
import { LoadingPaneService } from '@cms-services';
import { HttpService } from '@cms-services/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { BullActionTypes, LoadBulls } from './bull.actions';

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
            return new LoadBulls({bulls})
          })
        );
      })
    )
  );
}
