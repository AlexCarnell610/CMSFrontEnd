import { FORM_DATE_FORMAT } from '@cms-enums';
import * as moment from 'moment';
import { Observable } from 'rxjs';

export interface IMedication {
  id?: string;
  name: string;
  withdrawalPeriod: number;
  expiryDate: moment.Moment;
  batchNumber: string;
}

export interface ITreatment {
  id?: string;
  administerer: string;
  treatmentDate: moment.Moment;
  treatmentGroup: string;
  medication: string;
  createdAt?: moment.Moment
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
  constructor(public firstRow: string, public secondRow: string, public thirdRow: string, public fourthRow: string,  public isMedication: boolean, public id: string, public treatmentMedicationName?: Observable<string>) {
  
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
        expiryDate: moment(this.fourthRow, 'YYYY/MM'),
        id: this.id
      }
    }
    else if(!this.isMedication){
      return {
        treatmentGroup: this.firstRow,
        medication: this.secondRow,
        treatmentDate: moment(this.thirdRow, 'DD/MM/yyyy'),
        administerer: this.fourthRow,
        id: this.id
      }
    }
  }

}
