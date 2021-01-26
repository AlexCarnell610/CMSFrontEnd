import { Animal } from '@cms-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import {
  AnimalActions,
  AnimalActionTypes
} from '../../actions/src/animal.actions';
export interface AnimalState extends EntityState<Animal> {
  //additional stuff here
}

export const animalAdapter: EntityAdapter<Animal> = createEntityAdapter<Animal>({
  selectId: (animal) => animal.tagNumber,
});

export const initialState: AnimalState = animalAdapter.getInitialState({
  //additional stuff here
});

export function animalReducer(
  state = initialState,
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
    default: {
      return state;
    }
  }
}

const getAnimalState = createFeatureSelector<AnimalState>(
    'animal'
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = animalAdapter.getSelectors(getAnimalState);
