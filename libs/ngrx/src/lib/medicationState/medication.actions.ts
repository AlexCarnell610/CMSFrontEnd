import { Medication } from '@cms-interfaces';
import { Action } from '@ngrx/store';

export enum MedicationActionTypes {
  LoadMedications = '[Medication] Load Medications',
  LoadMedicationsSuccess = '[Medication] Load Medications Success',
  LoadMedicationsFailure = '[Medication] Load Medications Failure',
}

export class LoadMedications implements Action {
  readonly type = MedicationActionTypes.LoadMedications;
}

export class LoadMedicationsSuccess implements Action {
  readonly type = MedicationActionTypes.LoadMedicationsSuccess;
  constructor(public payload: { medication: Medication[] }) {}
}

export class LoadMedicationsFailure implements Action {
  readonly type = MedicationActionTypes.LoadMedicationsFailure;
  constructor(public payload: { error: any }) {}
}

export type MedicationActions =
  | LoadMedications
  | LoadMedicationsSuccess
  | LoadMedicationsFailure;
