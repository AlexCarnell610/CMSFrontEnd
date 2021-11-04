import { createFeatureSelector } from '@ngrx/store';
import {
  medicationAdapter,
  medicationFeatureKey,
  MedicationState,
} from './medication.reducer';

const getMedicationState =
  createFeatureSelector<MedicationState>(medicationFeatureKey);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  medicationAdapter.getSelectors(getMedicationState);
