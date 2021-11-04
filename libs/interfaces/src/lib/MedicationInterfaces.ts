import * as moment from 'moment';

export interface Medication {
  id: number;
  medicationName: string;
  batchNo: string;
  expiryDate: moment.Moment;
  size: number;
}

export interface Treatment {
  id: number;
  medicationID: number;
  dose: number;
  treatmentGroup?: string;
  treatmentTagNos?: string[];
  date: moment.Moment;
}
