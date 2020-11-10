import { Animal } from '@cms-interfaces';
import { Action } from '@ngrx/store';

export enum AnimalActionTypes {
    LoadAnimalDataType = '[Load] Load Data'
}

export class LoadAnimalData implements Action {
    readonly type = AnimalActionTypes.LoadAnimalDataType;
    constructor(public payload: {animals: Animal[]}){}
}

export type AnimalActions = LoadAnimalData 