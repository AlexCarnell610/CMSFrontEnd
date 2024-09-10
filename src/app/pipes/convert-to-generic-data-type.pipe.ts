import { Pipe, PipeTransform } from '@angular/core';
import {
  IMedDisplayDataType,
  IMedication,
  ITreatment,
  MedDisplayDataType,
  isMedicationArray,
  isTreatmentArray,
} from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectMedicationName } from '@cms-ngrx/medication';
import { Store } from '@ngrx/store';

@Pipe({
  name: 'convertToGenericDataType',
})
export class ConvertToGenericDataTypePipe implements PipeTransform {
  constructor(private readonly store: Store<RootState>){}
  transform(
    values: IMedication[] | ITreatment[],
    ...args: unknown[]
  ): MedDisplayDataType[] {
    if (values.length > 0) {
      if (isMedicationArray(values)) {
        return values.map((value) => {
          return new MedDisplayDataType(
            value.name,
            value.batchNumber,
            '' + value.withdrawalPeriod,
            null,
            value.expiryDate.format('YYYY/MM'),
            true,
            value.id
          );

          // {
          //   firstRow: value.name,
          //   isMedication: true,
          //   secondRow: value.batchNumber,
          //   thirdRow: '' + value.withdrawalPeriod,
          //   fourthRow: value.expiryDate.format('YYYY/MM'),
          // };
        });
      } else if (isTreatmentArray(values)) {
        return values.map((value) => {
          return new MedDisplayDataType(
            value.treatmentGroup,
            value.medication,
            value.treatmentStartDate.format('DD/MM/YYYY'),
            value.treatmentEndDate?.format('DD/MM/YYYY'),
            value.administerer,
            false,
            value.id,
            this.store.select(selectMedicationName(value.medication))
          );
        });
      }
    }

    return null;
  }
}
