import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from './treatment.reducer';

export const selectTreatments = createSelector(selectAll, (treatments) => treatments);