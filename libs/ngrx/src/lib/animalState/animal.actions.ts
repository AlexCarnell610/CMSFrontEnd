import { Animal, AnimalWeight, IAnimal, IBulkWeight } from '@cms-interfaces';
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
  UpdateManyAnimalsType = '[Animal] Update Many Animals',
  AddManyWeightsType = '[Animal] Add Many Weights',
  DeleteWeight = '[Animal] Delete Weight',
  DeleteWeightSuccess = '[Animal] Delete Weight Success',
  HTTPErrorType = '[HTTP] Error',
}

export class LoadAnimalData implements Action {
  readonly type = AnimalActionTypes.LoadAnimalDataType;
  constructor(public payload: { animals: IAnimal[] }) {}
}

export class AddAnimal implements Action {
  readonly type = AnimalActionTypes.AddAnimalType;
  constructor(public payload: { animal: IAnimal }) {}
}

export class UpdateAnimal implements Action {
  readonly type = AnimalActionTypes.UpdateAnimalType;
  constructor(public payload: Update<IAnimal>) {}
}

export class UpdateManyAnimals implements Action {
  readonly type = AnimalActionTypes.UpdateManyAnimalsType;
  constructor(public payload: Update<Animal>[] ) {}
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
  constructor(public payload: { weightUpdate: Update<IAnimal> }) {}
}

export class AddAnimalWeight implements Action {
  readonly type = AnimalActionTypes.AddAnimalWeightType;
  constructor(public payload: { newWeight: Update<IAnimal> }) {}
}

export class HTTPError implements Action {
  readonly type = AnimalActionTypes.HTTPErrorType;
  constructor(public payload: { error: any }) {}
}

export class AddManyWeights implements Action {
  readonly type = AnimalActionTypes.AddManyWeightsType;
  constructor(public payload: { weights: IBulkWeight[] }) {}
}

export class DeleteWeight implements Action {
  readonly type = AnimalActionTypes.DeleteWeight
  constructor(public payload: {weightID: number, animalID: string}){}
}

export class DeleteWeightSuccess implements Action {
  readonly type = AnimalActionTypes.DeleteWeightSuccess
  constructor(public payload: {animal: Update<IAnimal>}){}
}

export type AnimalActions =
  | LoadAnimalData
  | RetrieveAnimalData
  | LoadAnimalsFinished
  | UpdateAnimalWeight
  | AddAnimalWeight
  | AddAnimal
  | UpdateAnimal
  | AddManyWeights
  | UpdateManyAnimals
  | DeleteWeight
  | DeleteWeightSuccess
  | HTTPError;
