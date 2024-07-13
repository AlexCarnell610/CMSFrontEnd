import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from './medication.reducer';

export const selectMedications = createSelector(selectAll, (medications) => medications);