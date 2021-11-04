import { Treatment } from '@cms-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TreatmentActions, TreatmentActionTypes } from './treatment.actions';

export const treatmentFeatureKey = 'treatment';

export interface TreatmentState extends EntityState<Treatment> {}

export const treatmentAdapter: EntityAdapter<Treatment> =
  createEntityAdapter<Treatment>();

export const initialTreatmentState: TreatmentState =
  treatmentAdapter.getInitialState();

export function treatmentReducer(
  state = initialTreatmentState,
  action: TreatmentActions
): TreatmentState {
  switch (action.type) {
    case TreatmentActionTypes.LoadTreatmentsSuccess: {
      return treatmentAdapter.setAll(action.payload.treatments, state);
    }
    default:
      return state;
  }
}
