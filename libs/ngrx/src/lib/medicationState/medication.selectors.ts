import { createSelector } from '@ngrx/store';
import { selectAll } from './medication.reducer';
import * as moment from 'moment';

export const selectMedications = createSelector(
  selectAll,
  (medications) => medications
);

export const selectMedicationName = (medicationID) =>
  createSelector(
    selectMedications,
    (medications) =>
      medications.find((medication) => medication.id === medicationID).name
  );

export const selectInDateMedications = createSelector(
  selectMedications,
  (medications) =>
    medications.filter((medication) =>
      medication.expiryDate.isSameOrAfter(moment())
    )
);

export const selectOutOfDateMedications = createSelector(
  selectMedications,
  (medications) =>
    medications.filter((medication) => medication.expiryDate.isBefore(moment())).map(medication => {
      return {
        ...medication,
        name: medication.name+" EXPIRED"
      }
    })
);
