import { Treatment } from '@cms-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  treatmentAdapter,
  treatmentFeatureKey,
  TreatmentState,
} from './treatment.reducer';

const getTreatmentState =
  createFeatureSelector<TreatmentState>(treatmentFeatureKey);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  treatmentAdapter.getSelectors();

export const selectTreatmentById = createSelector(
  selectAll,
  (treatments: Treatment[], props: { id: number }) =>
    treatments.find((treatment) => treatment.id === props.id)
);
