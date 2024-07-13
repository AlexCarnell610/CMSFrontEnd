import { Pipe, PipeTransform } from '@angular/core';
import {
  IMedDisplayDataType,
  IMedication,
  MedDisplayDataType,
  isMedicationArray,
} from '@cms-interfaces';

@Pipe({
  name: 'convertToGenericDataType',
})
export class ConvertToGenericDataTypePipe implements PipeTransform {
  transform(values: IMedication[], ...args: unknown[]): MedDisplayDataType[] {
    if (values.length > 0 && isMedicationArray(values)) {
      return values.map((value) => {
        return new MedDisplayDataType(
          value.name,
          value.batchNumber,
          '' + value.withdrawalPeriod,
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
    }

    return null;
  }
}
