import { Medication } from '@cms-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as moment from 'moment';
import {
  medicationAdapter,
  medicationFeatureKey,
  MedicationState,
} from './medication.reducer';

const getMedicationState =
  createFeatureSelector<MedicationState>(medicationFeatureKey);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  medicationAdapter.getSelectors(getMedicationState);

export const selectInDateMedications = createSelector(
  selectAll,
  (medications: Medication[]) => {
    return medications.filter((med) => med.expiry.isAfter(moment.now()));
  }
);

export const selectMedicationById = (id: number) =>
  createSelector(selectAll, (medications: Medication[]) => {
    return medications.find((medication) => medication.id == id);
  });
