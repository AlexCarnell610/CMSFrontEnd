import { Injectable } from '@angular/core';
import { LoadingPaneService } from '@cms-services';
import { HttpService } from '@cms-services/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadMedicationsFinished } from '.';
import {
  LoadMedicationsData,
  MedicationActionTypes,
} from './medication.actions';

@Injectable()
export class MedicationEffects {
  constructor(
    private actions$: Actions,
    private readonly loadingStateService: LoadingPaneService,
    private readonly httpService: HttpService
  ) {}

  $retrieveMedications = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActionTypes.RetrieveMedications),
      switchMap(() => {
        this.loadingStateService.setLoadingState(true);
        return this.httpService.getMedications().pipe(
          map((medication) => {
            return new LoadMedicationsData({ medication });
          })
        );
      })
    )
  );

  $loadMedications = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActionTypes.LoadMedications),
      switchMap(() => {
        this.loadingStateService.setLoadingState(false);
        return of(new LoadMedicationsFinished());
      })
    )
  );
}
