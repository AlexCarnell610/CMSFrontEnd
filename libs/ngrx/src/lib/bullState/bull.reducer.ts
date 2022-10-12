import { IBull } from '@cms-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { BullActions, BullActionTypes } from './bull.actions';


export const bullsFeatureKey = 'bull';

export interface BullState extends EntityState<IBull> {
  // additional entities state properties
}

export const adapter: EntityAdapter<IBull> = createEntityAdapter<IBull>({
  selectId: (bull) => bull.tagNumber
});

export const initialBullState: BullState = adapter.getInitialState({
  // additional entity state properties
});

export function bullReducer(
  state = initialBullState,
  action: BullActions
): BullState {
  switch (action.type) {
    case BullActionTypes.AddBull: {
      return adapter.addOne(action.payload.bull, state);
    }

    case BullActionTypes.UpsertBull: {
      return adapter.upsertOne(action.payload.bull, state);
    }

    case BullActionTypes.AddBulls: {
      return adapter.addMany(action.payload.bulls, state);
    }

    case BullActionTypes.UpsertBulls: {
      return adapter.upsertMany(action.payload.bulls, state);
    }

    case BullActionTypes.UpdateBull: {
      return adapter.updateOne(action.payload.bull, state);
    }

    case BullActionTypes.UpdateBulls: {
      return adapter.updateMany(action.payload.bulls, state);
    }

    case BullActionTypes.DeleteBull: {
      return adapter.removeOne(action.payload.id, state);
    }

    case BullActionTypes.DeleteBulls: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case BullActionTypes.LoadBulls: {
      return adapter.setAll(action.payload.bulls, state);
    }

    case BullActionTypes.ClearBulls: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

const getBullState = createFeatureSelector<BullState>(
  bullsFeatureKey
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getBullState);
