import { IMedication } from '@cms-interfaces';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import {
  initialLoadMedicationsSuccess,
  loadMedicationSuccess,
  updateMedicationSuccess,
} from './medication.actions';

export const medicationFeatureKey = 'medication';

export interface MedicationState extends EntityState<IMedication> {}

function sortByCreatedDate(a: IMedication, b: IMedication): number {
  return a.createdAt.isAfter(b.createdAt) ? -1 : b.createdAt.isAfter(a.createdAt) ? 1 : 0
}

export const medicationAdapter: EntityAdapter<IMedication> =
  createEntityAdapter<IMedication>({
    selectId: (medication) => medication.id,
    sortComparer: sortByCreatedDate
  });

export const initialMedicationState: MedicationState = medicationAdapter.getInitialState(
  {}
);

export const medicationReducer = createReducer(
  initialMedicationState,
  on(initialLoadMedicationsSuccess, (state, { medications }) =>
    medicationAdapter.setAll(medications, state)
  ),
  on(initialLoadMedicationsSuccess, (state, { medications }) =>
    medicationAdapter.upsertMany(medications, state)
  ),
  on(loadMedicationSuccess, (state, { medications }) =>
    medicationAdapter.upsertMany(medications, state)
  ),
  on(initialLoadMedicationsSuccess, (state, { medications }) =>
    medicationAdapter.setAll(medications, state)
  ),
  on(updateMedicationSuccess, (state, { medication }) =>
    medicationAdapter.updateOne(medication, state)
  )
);

export const getMedicationState =
  createFeatureSelector<MedicationState>(medicationFeatureKey);

export const selectAllMedications = medicationAdapter.getSelectors(getMedicationState).selectAll

export const { selectIds, selectEntities, selectAll, selectTotal } =
  medicationAdapter.getSelectors(getMedicationState);
