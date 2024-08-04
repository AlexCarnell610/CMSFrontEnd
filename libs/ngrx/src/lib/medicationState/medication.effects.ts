import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addMedication,
  initialLoadDataReceived,
  initialLoadMedications,
  initialLoadMedicationsSuccess,
  loadMedicationSuccess,
  updateMedication,
  updateMedicationSuccess,
} from './medication.actions';
import { map, switchMap } from 'rxjs/operators';
import { LoadingPaneService } from '@cms-services';
import { HttpService } from '@cms-services/http';

@Injectable()
export class MedicationEffects {
  constructor(
    private actions$: Actions,
    private readonly loadingService: LoadingPaneService,
    private readonly httpService: HttpService
  ) {}

  readonly addMedication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMedication),
      switchMap((action) => {
        this.loadingService.setLoadingState(true);
        return this.httpService
          .addMedication(action.medication)
          .pipe(
            map((medication) =>
              loadMedicationSuccess({ medications: [medication] })
            )
          );
      })
    )
  );

  readonly loadMedicationsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadMedicationSuccess),
        map(() => {
          this.loadingService.setLoadingState(false);
        })
      ),
    { dispatch: false }
  );

  readonly initialLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initialLoadMedications),
      switchMap(() => {
        this.loadingService.setLoadingState(true);
        this.loadingService.setLoadingState(true);

        return this.httpService.getMedicationData().pipe(
          map((medications) =>
            initialLoadDataReceived({
              medications: medications.medications,
              treatments: medications.treatments,
            })
          )
        );
      })
    )
  );

  readonly dataReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initialLoadDataReceived),
      map((action) =>
        initialLoadMedicationsSuccess({ medications: action.medications })
      )
    )
  );

  readonly initialLoadSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initialLoadMedicationsSuccess),
        map(() => {
          this.loadingService.setLoadingState(false);
        })
      ),
    { dispatch: false }
  );

  readonly updateMedication = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMedication),
      switchMap((action) => {
        this.loadingService.setLoadingState(true);
        return this.httpService
          .updateMedication(
            action.medication.changes,
            '' + action.medication.id
          )
          .pipe(
            map((response) =>
              updateMedicationSuccess({
                medication: { changes: response, id: response.id },
              })
            )
          );
      })
    )
  );

  readonly updateMedicatoinSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateMedicationSuccess),
        map(() => this.loadingService.stopLoading())
      ),
    { dispatch: false }
  );
}
