import { IAnimal } from '@cms-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { AnimalActions, AnimalActionTypes } from './animal.actions';

const animalFeatureKey = 'animal';

function sortByTag(a: IAnimal, b: IAnimal): number {
  const tagA = Number.parseInt(a.tagNumber.slice(2));
  const tagB = Number.parseInt(b.tagNumber.slice(2));

  return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
}
export interface AnimalState extends EntityState<IAnimal> {}

export const animalAdapter: EntityAdapter<IAnimal> = createEntityAdapter<IAnimal>(
  {
    selectId: (animal) => animal.tagNumber,
    sortComparer: sortByTag,
  }
);

export const initialAnimalState: AnimalState = animalAdapter.getInitialState(
  {}
);

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
      return animalAdapter.updateOne(action.payload.weightUpdate, state);
    }
    case AnimalActionTypes.HTTPErrorType: {
      return state;
    }
    case AnimalActionTypes.AddAnimalWeightType: {
      return animalAdapter.updateOne(action.payload.newWeight, state);
    }
    case AnimalActionTypes.AddAnimalType: {
      return animalAdapter.addOne(action.payload.animal, state);
    }
    case AnimalActionTypes.UpdateAnimalType: {
      return animalAdapter.updateOne(action.payload, state);
    }
    case AnimalActionTypes.UpdateManyAnimalsType: {
      return animalAdapter.updateMany(action.payload, state)
    }
    case AnimalActionTypes.DeleteWeightSuccess: {
      return animalAdapter.updateOne(action.payload.animal, state)
    }
    default: {
      return state;
    }
  }
}

const getAnimalState = createFeatureSelector<AnimalState>(animalFeatureKey);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = animalAdapter.getSelectors(getAnimalState);
