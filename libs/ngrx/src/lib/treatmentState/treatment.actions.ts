import { ITreatment } from '@cms-interfaces';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export enum TreatmentActionTypes {
  InitialLoadTreatments = '[Treatment] Initial Load Treatments',
  InitialLoadTreatmentSuccess = '[Treatment] Initial Load Treatments Success',
  LoadTreatmentFailure = '[Treatment] Load Treatments Failure',
  AddTreatment = '[Treatment] Add Treatment',
  UpsertTreatment = '[Treatment] Upsert Treatment',
  AddTreatments = '[Treatment] Add Treatments',
  UpsertTreatments = '[Treatment] Upsert Treatments',
  UpdateTreatment = '[Treatment] Update Treatment',
  UpdateTreatmentSuccess = '[Treatment] Update Treatment Success',
  UpdateTreatments = '[Treatment] Update Treatments',
  DeleteTreatment = '[Treatment] Delete Treatment',
  DeleteTreatments = '[Treatment] Delete Treatments',
  ClearTreatments = '[Treatment] Clear Treatments',
  RetrieveTreatments = '[Treatment] Retrieve Data',
  LoadTreatmentsFinished = '[Treatment] Load Finished',
  LoadTreatmentSuccess = '[Treatment] Load Treatments Success',
  UpdateTreatmentFinished = '[Treatment] Update Finished',
}

export const initialLoadTreatments = createAction(
  TreatmentActionTypes.InitialLoadTreatments
);

export const initialLoadTreatmentsSuccess = createAction(
  TreatmentActionTypes.InitialLoadTreatmentSuccess,
  props<{ treatments: ITreatment[] }>()
);

export const loadTreatmentSuccess = createAction(
  TreatmentActionTypes.LoadTreatmentSuccess,
  props<{ treatments: ITreatment[] }>()
);

export const loadTreatmentsFailure = createAction(
  TreatmentActionTypes.LoadTreatmentFailure,
  props<{ error: any }>()
);

export const addTreatment = createAction(
  TreatmentActionTypes.AddTreatment,
  props<{ treatment: ITreatment }>()
);

export const updateTreatment = createAction(
  TreatmentActionTypes.UpdateTreatment,
  props<{ treatment: Update<ITreatment> }>()
);

export const updateTreatmentSuccess = createAction(
  TreatmentActionTypes.UpdateTreatmentSuccess,
  props<{ treatment: Update<ITreatment> }>()
);
