import { createSelector } from '@ngrx/store';
import { selectAll } from '../../reducers/src/animals.reducer';





export const selectAnimals = createSelector(
    selectAll,
    (animals) => {
        return animals;
    }
)