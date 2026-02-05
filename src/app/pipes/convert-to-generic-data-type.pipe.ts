import { Pipe, PipeTransform } from '@angular/core';
import {
  
  IMedication,
  ITreatment,
  MedDisplayDataType,
  isMedicationArray,
  isTreatment,
  isTreatmentArray,
} from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectMedication, selectMedicationBatchNum, selectMedicationName, selectMedicationWithdrawal } from '@cms-ngrx/medication';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
    name: 'convertToGenericDataType',
    standalone: false
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
            this.store.select(selectMedicationName(value.medication)),
            this.getWithDrawalEndDate(value),
            this.store.select(selectMedicationBatchNum(value.medication))
          );
        });
      }
    }

    return null;
  }

  private getWithDrawalEndDate(treatment: ITreatment): Observable<string> {
    
      return this.store
        .select(selectMedicationWithdrawal(treatment.medication))
        .pipe(
          map((withdrawalLength) =>
            treatment.treatmentEndDate
              ? treatment.treatmentEndDate
                  .add(withdrawalLength, 'days')
                  .format('DD/MM/YYYY')
              : treatment.treatmentStartDate
                  .add(withdrawalLength, 'days')
                  .format('DD/MM/YYYY')
          )
        );
    
  }
}
