import { DATE_SHORT, YEAR_MONTH } from '@cms-enums';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';

export interface IMedication {
  id?: string;
  name: string;
  withdrawalPeriod: number;
  expiryDate: DateTime;
  batchNumber: string;
  createdAt?:DateTime
}

export interface ITreatment {
  id?: string;
  administerer: string;
  treatmentStartDate: DateTime;
  treatmentEndDate?:DateTime;
  treatmentGroup: string;
  medication: string;
  createdAt?: DateTime
}

export interface IMedDisplayDataType {
  firstRow: string;
  secondRow: string;
  thirdRow: string;
  fourthRow: string;
  isMedication: boolean;
  id: string
}

export function isTreatment(data: any): data is ITreatment {
  return 'administerer' in data;
}

export function isTreatmentArray(data: any): data is ITreatment[] {
  return Array.isArray(data) && isTreatment(data[0])
}

export function isMedication(data: any): data is IMedication {
  return 'batchNumber' in data;
}

export function isMedicationArray(data: any): data is IMedication[] {
  return Array.isArray(data) && isMedication(data[0]);
}

export class MedDisplayDataType implements IMedDisplayDataType {
  constructor(public firstRow: string, public secondRow: string, public thirdRow: string, public fourthRow: string, public fifthRow: string,  public isMedication: boolean, public id: string, public treatmentMedicationName?: Observable<string>, public treatmentWithdrawalEnd?: Observable<string>, public treatmentMedicationBatchNum?: Observable<string>) {
  
  }

  // firstRow: string;
  // fourthRow: string;
  // isMedication: boolean;
  // secondRow: string;
  // thirdRow: string;



  toInitialType(): IMedication | ITreatment {
    if (this.isMedication) {
      return {
        name: this.firstRow,
        batchNumber: this.secondRow,
        withdrawalPeriod: +this.thirdRow,
        expiryDate: DateTime.fromFormat(this.fifthRow, YEAR_MONTH),
        id: this.id
      }
    }
    else if(!this.isMedication){
      return {
        treatmentGroup: this.firstRow,
        medication: this.secondRow,
        treatmentStartDate: DateTime.fromFormat(this.thirdRow, DATE_SHORT),
        treatmentEndDate: this.fourthRow ? DateTime.fromFormat(this.fourthRow, DATE_SHORT) : null,
        administerer: this.fifthRow,
        id: this.id
      }
    }
  }

}
