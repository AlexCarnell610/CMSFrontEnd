import { createSelector } from '@ngrx/store';
import { selectAll } from './medication.reducer';
import * as moment from 'moment';

export const selectMedications = createSelector(
  selectAll,
  (medications) => medications
);

export const selectMedicationName = (medicationID) =>
  createSelector(
    selectMedication(medicationID),
    (medication) => medication.name
  );

  export const selectMedicationBatchNum = (medicationID) =>
    createSelector(
      selectMedication(medicationID),
      (medication) => medication.batchNumber
    );

export const selectMedication = (medicationID) =>
  createSelector(selectMedications, (medications) =>
    medications.find((medication) => medication.id === medicationID)
  );

export const selectMedicationWithdrawal = (medicationID) =>
  createSelector(
    selectMedication(medicationID),
    (medication) => medication.withdrawalPeriod
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
    medications
      .filter((medication) => medication.expiryDate.isBefore(moment()))
      .map((medication) => {
        return {
          ...medication,
          name: medication.name,
        };
      })
);
