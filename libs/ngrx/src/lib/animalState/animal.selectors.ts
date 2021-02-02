import { Gender } from '@cms-enums';
import { age, Animal } from '@cms-interfaces';
import { createSelector } from '@ngrx/store';
import { selectAll } from './animals.reducer';

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

export const getDams = createSelector(
    selectAll,
    (animals: Animal[]) => {
        return animals.filter(animal => {
            console.warn(age(animal.birthDate));
            return animal.gender === Gender.Female && age(animal.birthDate) > 2
        })
    }
)

// export const getSires = createSelector(
//     selectAll
// )
