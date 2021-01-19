import { Animal } from '@cms-interfaces';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export enum AnimalActionTypes {
  LoadAnimalDataType = '[Load] Load Data',
  RetrieveAnimalDataType = '[Load] Retrieve Data',
  LoadAnimalsFinishedType = '[Load] Load Finished',
  UpdateAnimalWeightType = '[Update] Weight or Date',
}

export class LoadAnimalData implements Action {
  readonly type = AnimalActionTypes.LoadAnimalDataType;
  constructor(public payload: { animals: Animal[] }) {}
}

export class RetrieveAnimalData implements Action {
  readonly type = AnimalActionTypes.RetrieveAnimalDataType;
  constructor() {}
}

export class LoadAnimalsFinished implements Action {
  readonly type = AnimalActionTypes.LoadAnimalsFinishedType;
}

export class UpdateAnimalWeight implements Action {
  readonly type = AnimalActionTypes.UpdateAnimalWeightType;
  constructor(public payload: { weightUpdate: Update<Animal> }) {}
}

export type AnimalActions =
  | LoadAnimalData
  | RetrieveAnimalData
  | LoadAnimalsFinished
  | UpdateAnimalWeight;
