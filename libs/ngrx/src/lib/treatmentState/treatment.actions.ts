import { Treatment } from '@cms-interfaces';
import { Action } from '@ngrx/store';

export enum TreatmentActionTypes {
  RetrieveTreatmentData = '[Treatment] Retrieve Treatment Data',
  LoadTreatmentData = '[Treatment] Load Treatment Data',
  LoadTreatmentsFailure = '[Treatment] Load Treatments Failure',
  LoadTreatmentDataFinished = '[Treatment] Load Treatment Data Finished',
}

export class RetrieveTreatmentData implements Action {
  readonly type = TreatmentActionTypes.RetrieveTreatmentData;
}

export class LoadTreatmentData implements Action {
  readonly type = TreatmentActionTypes.LoadTreatmentData;
  constructor(public payload: { treatments: Treatment[] }) {}
}

export class LoadTreatmentDataFinished implements Action {
  readonly type = TreatmentActionTypes.LoadTreatmentDataFinished;
}

export class LoadTreatmentsFailure implements Action {
  readonly type = TreatmentActionTypes.LoadTreatmentsFailure;
  constructor(public payload: { error: any }) {}
}

export type TreatmentActions =
  | RetrieveTreatmentData
  | LoadTreatmentData
  | LoadTreatmentsFailure;
