import { Animal, AnimalWeight } from '@cms-interfaces';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export enum AnimalActionTypes {
  LoadAnimalDataType = '[Animal] Load Data',
  RetrieveAnimalDataType = '[Animal] Retrieve Data',
  LoadAnimalsFinishedType = '[Animal] Load Finished',
  UpdateAnimalWeightType = '[Animal] Update Weight or Date',
  AddAnimalWeightType = '[Animal] Add Weight',
  AddAnimalType = '[Animal] Add Animal',
  UpdateAnimalType = '[Animal] Update Animal',
  HTTPErrorType = '[HTTP] Error',
}

export class LoadAnimalData implements Action {
  readonly type = AnimalActionTypes.LoadAnimalDataType;
  constructor(public payload: { animals: Animal[] }) {}
}

export class AddAnimal implements Action {
  readonly type = AnimalActionTypes.AddAnimalType;
  constructor(public payload: { animal: Animal }) {}
}

export class UpdateAnimal implements Action {
  readonly type = AnimalActionTypes.UpdateAnimalType;
  constructor(public payload: Update<Animal> ) {}
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

export class AddAnimalWeight implements Action {
  readonly type = AnimalActionTypes.AddAnimalWeightType;
  constructor(public payload: { newWeight: AnimalWeight; id: string }) {}
}

export class HTTPError implements Action {
  readonly type = AnimalActionTypes.HTTPErrorType;
  constructor(public payload: { error: any }) {}
}

export type AnimalActions =
  | LoadAnimalData
  | RetrieveAnimalData
  | LoadAnimalsFinished
  | UpdateAnimalWeight
  | AddAnimalWeight
  | AddAnimal
  | UpdateAnimal
  | HTTPError;
