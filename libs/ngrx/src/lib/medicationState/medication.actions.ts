import { IMedication, ITreatment } from '@cms-interfaces';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export enum MedicationActionTypes {
  InitialLoadMedications = '[Medication] Initial Load Medications',
  InitialLoadMedicationSuccess = '[Medication] Initial Load Medications Success',
  InitialLoadDataReceived = '[Medication] Initial Load Data Received',
  LoadMedicationFailure = '[Medication] Load Medications Failure',
  AddMedication = '[Medication] Add Medication',
  UpsertMedication = '[Medication] Upsert Medication',
  AddMedications = '[Medication] Add Medications',
  UpsertMedications = '[Medication] Upsert Medications',
  UpdateMedication = '[Medication] Update Medication',
  UpdateMedicationSuccess = '[Medication] Update Medication Success',
  UpdateMedications = '[Medication] Update Medications',
  DeleteMedication = '[Medication] Delete Medication',
  DeleteMedications = '[Medication] Delete Medications',
  ClearMedications = '[Medication] Clear Medications',
  RetrieveMedications = '[Medication] Retrieve Data',
  LoadMedicationsFinished = '[Medication] Load Finished',
  LoadMedicationSuccess = '[Medication] Load Medications Success',
  UpdateMedicationFinished = '[Medication] Update Finished',
}

export const initialLoadMedications = createAction(
  MedicationActionTypes.InitialLoadMedications
);

export const initialLoadMedicationsSuccess = createAction(
  MedicationActionTypes.InitialLoadMedicationSuccess,
  props<{ medications: IMedication[] }>()
);

export const initialLoadDataReceived = createAction(
  MedicationActionTypes.InitialLoadDataReceived,
  props<{medications: IMedication[], treatments: ITreatment[]}>()
)

export const loadMedicationSuccess = createAction(
  MedicationActionTypes.LoadMedicationSuccess,
  props<{ medications: IMedication[] }>()
);

export const loadMedicationsFailure = createAction(
  MedicationActionTypes.LoadMedicationFailure,
  props<{ error: any }>()
);

export const addMedication = createAction(
  MedicationActionTypes.AddMedication,
  props<{ medication: IMedication }>()
);

export const updateMedication = createAction(
  MedicationActionTypes.UpdateMedication,
  props<{ medication: Update<IMedication> }>()
);

export const updateMedicationSuccess = createAction(
  MedicationActionTypes.UpdateMedicationSuccess,
  props<{ medication: Update<IMedication> }>()
);
