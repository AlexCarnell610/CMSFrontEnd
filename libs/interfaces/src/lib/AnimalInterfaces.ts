import { Gender } from '@cms-enums';
import * as moment from 'moment';

export interface Bull {
    tagNumber: string,
    breed: string,
    name: string
}

export interface BaseAnimal {
    tagNumber: string,
    birthDate: moment.Moment,
    managementTag: string,
    gender: Gender
}

export interface Dam extends BaseAnimal{
    damTag: string,
    sireTag:string
}

export interface Animal extends BaseAnimal {
    dam: BaseAnimal,
    sire: Bull,
    ai: AI[],
    calvingStats: CalvingStat[],
    calvingHistory: CalvingHistory[],
    weightData: AnimalWeight[]
}

export interface AI {
    aiDate: moment.Moment,
    bull: Bull,
    sweeperBull: boolean,
    heatDate: moment.Moment,
    year: number,
    id: number
}

export interface CalvingStat {
    characteristic: string,
    weighting: number,
    score: number
}

export interface CalvingHistory {
    averageGestation: number,
    numberOfCalves: number
}

export interface AnimalWeight {
    id: string,
    weightDate: moment.Moment,
    weight: number,
    weightType: AnimalWeightType
}

export interface AnimalWeightType {
    isInitial: boolean,
    isSale: boolean
}