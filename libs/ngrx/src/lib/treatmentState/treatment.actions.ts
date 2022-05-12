import { Treatment } from '@cms-interfaces';
import { Action } from '@ngrx/store';

export enum TreatmentActionTypes {
  RetrieveTreatmentData = '[Treatment] Retrieve Treatment Data',
  LoadTreatmentData = '[Treatment] Load Treatment Data',
  LoadTreatmentsFailure = '[Treatment] Load Treatments Failure',
  LoadTreatmentDataFinished = '[Treatment] Load Treatment Data Finished',
  AddTreatment = '[Treatment] Add New Treatment',
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

export class AddTreatment implements Action {
  readonly type = TreatmentActionTypes.AddTreatment;
  constructor(public payload: { treatment: Treatment }) {}
}

export type TreatmentActions =
  | RetrieveTreatmentData
  | LoadTreatmentData
  | LoadTreatmentsFailure
  | AddTreatment;
