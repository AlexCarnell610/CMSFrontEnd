import * as moment from 'moment';

export interface Medication {
  id: number;
  name: string;
  batchNo: string;
  expiry: moment.Moment;
  size: number;
}

export interface Treatment {
  id?: number;
  medication?: Medication;
  medicationID?: number;
  dose: number;
  treatmentGroup?: string;
  treatmentTagNos?: string[];
  date: moment.Moment;
}
