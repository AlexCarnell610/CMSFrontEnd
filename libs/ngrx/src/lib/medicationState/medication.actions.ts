import { Medication } from '@cms-interfaces';
import { Action } from '@ngrx/store';

export enum MedicationActionTypes {
  RetrieveMedications = '[Medication] Load Medications',
  LoadMedications = '[Medication] Load Medications Success',
  LoadMedicationsFailure = '[Medication] Load Medications Failure',
  LoadMedicationsDataFinished = '[Medication] Load Medications Finished',
}

export class RetrieveMedications implements Action {
  readonly type = MedicationActionTypes.RetrieveMedications;
}

export class LoadMedicationsData implements Action {
  readonly type = MedicationActionTypes.LoadMedications;
  constructor(public payload: { medication: Medication[] }) {}
}

export class LoadMedicationsFailure implements Action {
  readonly type = MedicationActionTypes.LoadMedicationsFailure;
  constructor(public payload: { error: any }) {}
}

export class LoadMedicationsFinished implements Action {
  readonly type = MedicationActionTypes.LoadMedicationsDataFinished;
}

export type MedicationActions =
  | RetrieveMedications
  | LoadMedicationsData
  | LoadMedicationsFailure;
