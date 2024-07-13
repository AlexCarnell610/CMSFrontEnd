import * as moment from 'moment';

export interface IMedication {
  id?: string;
  name: string;
  withdrawalPeriod: number;
  expiryDate: moment.Moment;
  batchNumber: string;
}

export interface ITreatment {
  id: string;
  administerer: string;
  date: moment.Moment;
  treatmentGroup: string;
  medication: string;
}

export interface IMedDisplayDataType {
  firstRow: string;
  secondRow: string;
  thirdRow: string;
  fourthRow: string;
  isMedication: boolean;
  id: string
}

export function isMedication(data: any): data is IMedication {
  return 'batchNumber' in data;
}

export function isMedicationArray(data: any): data is IMedication[] {
  return Array.isArray(data) && isMedication(data[0]);
}

export class MedDisplayDataType implements IMedDisplayDataType {
  constructor(public firstRow: string, public secondRow: string, public thirdRow: string, public fourthRow: string,  public isMedication: boolean, public id: string) {
  
  }

  // firstRow: string;
  // fourthRow: string;
  // isMedication: boolean;
  // secondRow: string;
  // thirdRow: string;

  toInitialType(): IMedication {
    if (this.isMedication) {
      return {
        name: this.firstRow,
        batchNumber: this.secondRow,
        withdrawalPeriod: +this.thirdRow,
        expiryDate: moment(this.fourthRow, 'YYYY/MM'),
        id: this.id
      }
    }
  }

}
