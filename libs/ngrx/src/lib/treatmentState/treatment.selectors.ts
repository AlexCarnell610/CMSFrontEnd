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
  treatmentAdapter.getSelectors(getTreatmentState);

export const selectTreatmentById = (id: number) =>
  createSelector(selectAll, (treatments: Treatment[]) =>
    treatments.find((treatment) => treatment.id === id)
  );

export const getUniqueGroups = () =>
  createSelector(selectAll, (treatments: Treatment[]) => {
    return treatments
      .map((treatment) => {
        return { value: treatment.treatmentGroup, group: 'Treatment Groups' };
      })
      .filter(
        (treatmentGrp, index, array) =>
          treatmentGrp.value !== null &&
          array.lastIndexOf(treatmentGrp) == index
      );
  });
