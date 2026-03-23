import { createSelector } from '@ngrx/store';
import {
  getMedicationState,
  medicationAdapter,
  selectAll,
  selectAllMedications,
  selectIds,
} from './medication.reducer';
import { IMedication } from '@cms-interfaces';

export const selectMedicationName = (medicationID) =>
  createSelector(
    selectMedication(medicationID),
    (medication) => medication.name
  );

export const selectMedications2 = () =>
  createSelector(selectAll, (medications) => medications);

export const selectMedicationBatchNum = (medicationID) =>
  createSelector(
    selectMedication(medicationID),
    (medication) => medication.batchNumber
  );

export const selectMedication = (medicationID) =>
  createSelector(selectMedications2(), (medications) =>
    medications.find((medication) => medication.id === medicationID)
  );

export const selectMedicationWithdrawal = (medicationID) =>
  createSelector(
    selectMedication(medicationID),
    (medication) => medication.withdrawalPeriod
  );

export const selectInDateMedications = createSelector(
  selectMedications2(),
  (medications: IMedication[]) =>
    medications.filter((medication) => {
      return Math.ceil(medication.expiryDate.diffNow('days').days) >= 0;
    })
);

export const selectOutOfDateMedications = createSelector(
  medicationAdapter.getSelectors(getMedicationState).selectAll,
  (medication: IMedication[]) =>
    medication
      .filter(
        (medication: IMedication) =>
          Math.ceil(medication.expiryDate.diffNow('days').days) < 0
      )
      .map((medication) => {
        return {
          ...medication,
          name: medication.name,
        };
      })
);
