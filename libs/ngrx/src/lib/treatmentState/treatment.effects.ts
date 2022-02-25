import { Injectable } from '@angular/core';
import { LoadingPaneService } from '@cms-services';
import { HttpService } from '@cms-services/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  LoadTreatmentData,
  LoadTreatmentDataFinished,
  TreatmentActionTypes,
} from './treatment.actions';

@Injectable()
export class TreatmentEffects {
  constructor(
    private actions$: Actions,
    private readonly loadingService: LoadingPaneService,
    private readonly httpService: HttpService
  ) {}

  $retrieveTreatments = createEffect(() =>
    this.actions$.pipe(
      ofType(TreatmentActionTypes.RetrieveTreatmentData),
      switchMap(() => {
        this.loadingService.setLoadingState(true);
        return this.httpService.getTreatments().pipe(
          map((treatments) => {
            return new LoadTreatmentData({ treatments });
          })
        );
      })
    )
  );

  $loadTreatments = createEffect(() =>
    this.actions$.pipe(
      ofType(TreatmentActionTypes.LoadTreatmentData),
      switchMap(() => {
        this.loadingService.setLoadingState(false);
        return of(new LoadTreatmentDataFinished());
      })
    )
  );
}
