import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTreatment,
  initialLoadTreatments,
  initialLoadTreatmentsSuccess,
  loadTreatmentSuccess,
  updateTreatment,
  updateTreatmentSuccess,
} from './treatment.actions';
import { map, switchMap } from 'rxjs/operators';
import { LoadingPaneService } from '@cms-services';
import { HttpService } from '@cms-services/http';
import { initialLoadDataReceived } from '../medicationState/medication.actions';

@Injectable()
export class TreatmentEffects {
  constructor(
    private actions$: Actions,
    private readonly loadingService: LoadingPaneService,
    private readonly httpService: HttpService
  ) {}

  // readonly addTreatment$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addTreatment),
  //     switchMap((action) => {
  //       this.loadingService.setLoadingState(true);
  //       return this.httpService
  //         .addTreatment(action.treatment)
  //         .pipe(
  //           map((treatment) =>
  //             loadTreatmentSuccess({ treatments: [treatment] })
  //           )
  //         );
  //     })
  //   )
  // );

  readonly dataReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initialLoadDataReceived),
      map((action) =>
        initialLoadTreatmentsSuccess({ treatments: action.treatments })
      )
    )
  );

  readonly loadTreatmentsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadTreatmentSuccess),
        map(() => {
          this.loadingService.setLoadingState(false);
        })
      ),
    { dispatch: false }
  );

  readonly initialLoadSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initialLoadTreatmentsSuccess),
        map(() => {
          this.loadingService.setLoadingState(false);
        })
      ),
    { dispatch: false }
  );

  // readonly updateTreatment = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateTreatment),
  //     switchMap((action) => {
  //       this.loadingService.setLoadingState(true);
  //       return this.httpService
  //         .updateTreatment(
  //           action.treatment.changes,
  //           '' + action.treatment.id
  //         )
  //         .pipe(
  //           map((response) =>
  //             updateTreatmentSuccess({
  //               treatment: { changes: response, id: response.id },
  //             })
  //           )
  //         );
  //     })
  //   )
  // );

  readonly updateTreatmentSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTreatmentSuccess),
      map(() => this.loadingService.stopLoading())
    ),
    {dispatch: false}
  );
}
