import { Medication } from '@cms-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MedicationActions, MedicationActionTypes } from './medication.actions';

export const medicationFeatureKey = 'medication';

export interface MedicationState extends EntityState<Medication> {}

export const medicationAdapter: EntityAdapter<Medication> =
  createEntityAdapter<Medication>({
    selectId: (medication) => medication.id,
  });

export const initialMedicationState: MedicationState =
  medicationAdapter.getInitialState();

export function medicationReducer(
  state = initialMedicationState,
  action: MedicationActions
): MedicationState {
  switch (action.type) {
    case MedicationActionTypes.LoadMedicationsSuccess: {
      return medicationAdapter.setAll(action.payload.medication, state);
    }
    default:
      return state;
  }
}
