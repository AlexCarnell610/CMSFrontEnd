import { Treatment } from '@cms-interfaces';
import { Action } from '@ngrx/store';

export enum TreatmentActionTypes {
  LoadTreatments = '[Treatment] Load Treatments',
  LoadTreatmentsSuccess = '[Treatment] Load Treatments Success',
  LoadTreatmentsFailure = '[Treatment] Load Treatments Failure',
}

export class LoadTreatments implements Action {
  readonly type = TreatmentActionTypes.LoadTreatments;
}

export class LoadTreatmentsSuccess implements Action {
  readonly type = TreatmentActionTypes.LoadTreatmentsSuccess;
  constructor(public payload: { treatments: Treatment[] }) {}
}

export class LoadTreatmentsFailure implements Action {
  readonly type = TreatmentActionTypes.LoadTreatmentsFailure;
  constructor(public payload: { error: any }) {}
}

export type TreatmentActions =
  | LoadTreatments
  | LoadTreatmentsSuccess
  | LoadTreatmentsFailure;
