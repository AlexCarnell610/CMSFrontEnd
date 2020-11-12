import { Animal } from '@cms-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AnimalActions, AnimalActionTypes } from '../../actions/src/animal.actions';
export interface AnimalState extends EntityState<Animal> {
    //additional stuff here
}

export const adapter: EntityAdapter<Animal> = createEntityAdapter<Animal>({
    selectId: animal => animal.tagNumber
});

export const initialState: AnimalState = adapter.getInitialState({
    //additional stuff here
});

export function animalReducer(state = initialState, action: AnimalActions ): AnimalState{
    switch(action.type) {
        case AnimalActionTypes.LoadAnimalDataType: {
            console.error(action.payload.animals);
            
            return adapter.setAll(action.payload.animals, state)
        }
        case AnimalActionTypes.RetrieveAnimalDataType: {
            console.error("HELLO?????");
            
            return state;
        }
        default: {
            return state;
        }
    }
}

export const {selectIds, selectEntities, selectAll, selectTotal} = adapter.getSelectors();