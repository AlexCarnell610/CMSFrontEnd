import { Animal } from '@cms-interfaces';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../../reducers/src/animals.reducer';





export const selectAnimals = createSelector(
    selectAll,
    (animals) => {
        return animals;
    }
)

export const getAnimalByTag = createSelector(
    selectAll,
    (animals: Animal[], props : {tagNumber: string}) => {
        return animals.find(animal => animal.tagNumber === props.tagNumber)
    }
)