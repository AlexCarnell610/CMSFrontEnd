import { IBull } from '@cms-interfaces';
import { Update } from '@ngrx/entity';
import { Action, createAction, props } from '@ngrx/store';

export enum BullActionTypes {
  LoadBulls = '[Bull] Load Bulls',
  AddBull = '[Bull] Add Bull',
  UpsertBull = '[Bull] Upsert Bull',
  AddBulls = '[Bull] Add Bulls',
  UpsertBulls = '[Bull] Upsert Bulls',
  UpdateBull = '[Bull] Update Bull',
  UpdateBulls = '[Bull] Update Bulls',
  DeleteBull = '[Bull] Delete Bull',
  DeleteBulls = '[Bull] Delete Bulls',
  ClearBulls = '[Bull] Clear Bulls',
  RetrieveBulls = '[Bull] Retrieve Data',
  LoadBullsFinished = '[Bull] Load Finished',
  LoadBull = '[Bull] Load Bull',
  UpdateBullFinished = '[Bull] Update Finished',
}

export class LoadBullsFinished implements Action {
  readonly type = BullActionTypes.LoadBullsFinished;
}

export class RetreieveBullData implements Action {
  readonly type = BullActionTypes.RetrieveBulls;
}

export class LoadBulls implements Action {
  readonly type = BullActionTypes.LoadBulls;

  constructor(public payload: { bulls: IBull[] }) {}
}

export class AddBull implements Action {
  readonly type = BullActionTypes.AddBull;

  constructor(public payload: { bull: IBull }) {}
}

export class LoadBull implements Action {
  readonly type = BullActionTypes.LoadBull;

  constructor(public payload: { bull: IBull }) {}
}

export class UpsertBull implements Action {
  readonly type = BullActionTypes.UpsertBull;

  constructor(public payload: { bull: IBull }) {}
}

export class AddBulls implements Action {
  readonly type = BullActionTypes.AddBulls;

  constructor(public payload: { bulls: IBull[] }) {}
}

export class UpsertBulls implements Action {
  readonly type = BullActionTypes.UpsertBulls;

  constructor(public payload: { bulls: IBull[] }) {}
}

export class UpdateBull implements Action {
  readonly type = BullActionTypes.UpdateBull;

  constructor(public payload: { bull: Update<IBull> }) {}
}

export class UpdateBullFinished implements Action {
  readonly type = BullActionTypes.UpdateBullFinished;

  constructor(public payload: { bull: Update<IBull> }) {}
}

export class UpdateBulls implements Action {
  readonly type = BullActionTypes.UpdateBulls;

  constructor(public payload: { bulls: Update<IBull>[] }) {}
}

export class DeleteBull implements Action {
  readonly type = BullActionTypes.DeleteBull;

  constructor(public payload: { id: string }) {}
}

export class DeleteBulls implements Action {
  readonly type = BullActionTypes.DeleteBulls;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearBulls implements Action {
  readonly type = BullActionTypes.ClearBulls;
}

export type BullActions =
  | LoadBulls
  | AddBull
  | UpsertBull
  | AddBulls
  | UpsertBulls
  | UpdateBull
  | UpdateBulls
  | DeleteBull
  | DeleteBulls
  | ClearBulls
  | LoadBull
  | UpdateBullFinished;
