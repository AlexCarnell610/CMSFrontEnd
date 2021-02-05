import { Animal } from '@cms-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import {
  AnimalActions,
  AnimalActionTypes
} from './animal.actions';

const animalFeatureKey = 'animal';
export interface AnimalState extends EntityState<Animal> {
}

export const animalAdapter: EntityAdapter<Animal> = createEntityAdapter<Animal>({
  selectId: (animal) => animal.tagNumber,
});

export const initialAnimalState: AnimalState = animalAdapter.getInitialState({
});

export function animalReducer(
  state = initialAnimalState,
  action: AnimalActions
): AnimalState { 
  switch (action.type) {
    case AnimalActionTypes.LoadAnimalDataType: {
      return animalAdapter.setAll(action.payload.animals, state);
    }
    case AnimalActionTypes.RetrieveAnimalDataType: {
      return state;
    }
    case AnimalActionTypes.UpdateAnimalWeightType: {
      return animalAdapter.updateOne(action.payload.weightUpdate, state)
    }
    case AnimalActionTypes.HTTPErrorType: {
      return state;
    }
    case AnimalActionTypes.AddAnimalWeightType: {
      const weightData = state.entities[action.payload.id].weightData.slice()
      weightData.push(action.payload.newWeight);
      const id = action.payload.id
      return animalAdapter.updateOne({id, 
        changes: {...state.entities[id], weightData }
      }, state);
    }
    case AnimalActionTypes.AddAnimalType: {
      return animalAdapter.addOne(action.payload.animal, state)
    }
    case AnimalActionTypes.UpdateAnimalType: {
      return animalAdapter.updateOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

const getAnimalState = createFeatureSelector<AnimalState>(
    animalFeatureKey
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = animalAdapter.getSelectors(getAnimalState);
