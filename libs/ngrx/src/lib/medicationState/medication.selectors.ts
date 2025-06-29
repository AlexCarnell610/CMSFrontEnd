import { createSelector } from '@ngrx/store';
import { getMedicationState, medicationAdapter, selectAll, selectAllMedications, selectIds } from './medication.reducer';
import moment from 'moment';


export const selectMedicationName = (medicationID) =>
  createSelector(
    selectMedication(medicationID),
    (medication) => medication.name
  );

  export const selectMedications2 = () => createSelector(
    selectAll,
    (medications) => medications
  );

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
  
  () =>
    [].filter((medication) =>
      medication.expiryDate.isSameOrAfter(moment())
    )
);

export const selectOutOfDateMedications = createSelector(
  medicationAdapter.getSelectors(getMedicationState).selectAll,
  () =>
  []
      .filter((medication) => medication.expiryDate.isBefore(moment()))
      .map((medication) => {
        return {
          ...medication,
          name: medication.name,
        };
      })
);
