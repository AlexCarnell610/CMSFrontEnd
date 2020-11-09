import { Gender } from '@cms-enums';
import * as moment from 'moment';

export interface Bull {
    tagNumber: string,
    breed: string,
    name: string
}

export interface Animal {
    tagNumber: string,
    managementTag: string,
    dam: Animal,
    sire: Bull,
    birthDate: moment.Moment,
    gender: Gender,
    ai?: AI[],
    calvingStats?: CalvingStats[],
    calvingHistory?: CalvingHistory[],
    weightData: AnimalWeight[]
}

export interface AI {
    animal: Animal,
    aiDate: moment.Moment,
    bull: Bull,
    sweeperBull: boolean,
    heatDate: moment.Moment,
    year: number
}

export interface CalvingStats {
    animal: Animal,
    characteristic: string,
    weighting: number,
    value: number
}

export interface CalvingHistory {
    animal: Animal,
    averageGestation: number,
    numberOfCalves: number
}

export interface AnimalWeight {
    animal: Animal,
    weightDate: moment.Moment,
    weight: number,
    isInitial: boolean,
    isSale: boolean
}