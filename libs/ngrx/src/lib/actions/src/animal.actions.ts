import { Action } from '@ngrx/store';

export enum AnimalActionTypes {
    LoadAnimalDataType = '[Load] Load Data',
    LoadAnimalDataSuccessType = '[Load] Load Data Success'
}

export class LoadAnimalData implements Action {
    readonly type = AnimalActionTypes.LoadAnimalDataType;
}

export class LoadAnimalDataSuccess implements Action {
    readonly type = AnimalActionTypes.LoadAnimalDataSuccessType;
    constructor(public payload: number[]){}
}