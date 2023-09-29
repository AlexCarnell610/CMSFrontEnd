import { AssistanceReason, CalvingAssistance, Gender } from '@cms-enums';
import * as moment from 'moment';

export type Animal = IAnimal | IBull;
export interface IBull {
  tagNumber: string;
  breed: string;
  name: string;
}

export const bull: IBull = {
  tagNumber: 'TAGNUMBER',
  breed: 'DAVE',
  name: 'GARY',
};

export const UNKNOWN_DAM_TAG: string = "UK000000000000"

export interface BaseAnimal {
  tagNumber: string;
  birthDate: moment.Moment;
  managementTag: string;
  gender: Gender;
}

export interface Dam extends BaseAnimal {
  damTag: string;
  sireTag: string;
}

export interface TextAnimal extends BaseAnimal {
  dam: string;
  sire: { tagNumber: string };
  ai: AI[];
  calvingStat: CalvingStat;
  calvingHistory: CalvingHistory[];
  weightData: AnimalWeight[];
  notes?: string;
  breed: string;
}

export interface IAnimal extends BaseAnimal {
  dam?: Dam;
  damTag?: string;
  sire: { tagNumber: string };
  ai: AI[];
  calvingStat?: CalvingStat;
  calvingHistory: CalvingHistory[];
  weightData: AnimalWeight[];
  notes?: string;
  breed: string;
  registered: boolean;
  name?: string;
}

export interface AI {
  aiDate: moment.Moment;
  bull: { tagNumber: string };
  sweeperBull: boolean;
  heatDate: moment.Moment;
  year: number;
  id: number;
}

export interface CalvingStat {
  alive: boolean;
  assistance: CalvingAssistance;
  assistanceReason?: AssistanceReason[];
  gettingUp?: number;
  damHealth: number;
  drinkAssist?: boolean;
  calvingNotes: string;
}

export interface CalvingHistory {
  averageGestation: number;
  numberOfCalves: number;
}

export interface AnimalWeight {
  id?: number;
  weightDate: moment.Moment;
  weight: number;
  isSaleWeight: boolean;
  tag?: string;
}

export interface AnimalWeightType {
  isInitial: boolean;
  isSale: boolean;
}

export interface ICullUpdate {
  aliveCalves?: number;
  totalCalves?: number;
  calfDailyWeightGain?: number;
  age: number;
  score: number;
  tagNumber: string;
}

export interface IBulkWeight {
  id: string;
  weight: string;
  date: Date;
}

export interface IDobRange {
  from: moment.Moment;
  to: moment.Moment;
}

export function isAnimalArray(valArray: any[]): valArray is IAnimal[] {
  return valArray.every(val => isAnimal(val))
}

export function isAnimal(animal: any): animal is IAnimal {
  return 'managementTag' in animal;
}

export function isCow(animal: IAnimal | IBull): animal is IAnimal {
  return 'weightData' in animal;
}

export function isBull(animal: IAnimal | IBull): animal is IBull {
  return 'name' in animal;
}

export function age(
  birthDate: moment.Moment,
  period: moment.unitOfTime.Diff = 'year'
): number {
  return moment().diff(birthDate, period, true);
}
