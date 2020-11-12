import { Animal } from '@cms-interfaces';
import { Action } from '@ngrx/store';

export enum AnimalActionTypes {
    LoadAnimalDataType = '[Load] Load Data',
    RetrieveAnimalDataType = '[Load] Retrieve Data',
    LoadAnimalsFinishedType = '[Load] Load Finished'
}

export class LoadAnimalData implements Action {
    readonly type = AnimalActionTypes.LoadAnimalDataType;
    constructor(public payload: {animals: Animal[]}){}
}

export class RetrieveAnimalData implements Action {
    readonly type = AnimalActionTypes.RetrieveAnimalDataType;
    constructor(){}
}

export class LoadAnimalsFinished implements Action {
    readonly type = AnimalActionTypes.LoadAnimalsFinishedType
}

export type AnimalActions = LoadAnimalData | RetrieveAnimalData | LoadAnimalsFinished