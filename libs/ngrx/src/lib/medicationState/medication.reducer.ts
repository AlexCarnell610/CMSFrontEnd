import { IMedication } from '@cms-interfaces';
import { sortByCreatedDate } from '@cms-ngrx';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import {
  initialLoadMedicationsSuccess,
  loadMedicationSuccess,
  updateMedicationSuccess,
} from './medication.actions';

export const medicationFeatureKey = 'medication';

export interface MedicationState extends EntityState<IMedication> {}

export const adapter: EntityAdapter<IMedication> =
  createEntityAdapter<IMedication>({
    selectId: (medication) => medication.id,
    sortComparer: sortByCreatedDate
  });

export const initialMedicationState: MedicationState = adapter.getInitialState(
  {}
);

export const medicationReducer = createReducer(
  initialMedicationState,
  on(initialLoadMedicationsSuccess, (state, { medications }) =>
    adapter.setAll(medications, state)
  ),
  on(initialLoadMedicationsSuccess, (state, { medications }) =>
    adapter.upsertMany(medications, state)
  ),
  on(loadMedicationSuccess, (state, { medications }) =>
    adapter.upsertMany(medications, state)
  ),
  on(initialLoadMedicationsSuccess, (state, { medications }) =>
    adapter.setAll(medications, state)
  ),
  on(updateMedicationSuccess, (state, { medication }) =>
    adapter.updateOne(medication, state)
  )
);

const getMedicationState =
  createFeatureSelector<MedicationState>(medicationFeatureKey);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(getMedicationState);
