import { Injectable } from '@angular/core';
import { LoadingPaneService } from '@cms-services';
import { HttpService } from '@cms-services/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import {
  LoadTreatmentsSuccess,
  TreatmentActionTypes,
} from './treatment.actions';

@Injectable()
export class TreatmentEffects {
  constructor(
    private actions$: Actions,
    private readonly loadingService: LoadingPaneService,
    private readonly httpService: HttpService
  ) {}

  $loadTreatments = createEffect(() =>
    this.actions$.pipe(
      ofType(TreatmentActionTypes.LoadTreatments),
      switchMap(() => {
        this.loadingService.setLoadingState(true);
        return this.httpService.getTreatments().pipe(
          map((treatments) => {
            return new LoadTreatmentsSuccess({ treatments });
          })
        );
      })
    )
  );
}
