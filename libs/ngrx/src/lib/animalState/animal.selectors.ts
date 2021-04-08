import { Gender } from '@cms-enums';
import { age, Animal } from '@cms-interfaces';
import { createSelector } from '@ngrx/store';
import { selectAll } from './animals.reducer';

export const selectAnimals = createSelector(selectAll, (animals) => {
  return animals.filter((animal) => animal.tagNumber !== 'UK000000000000');
});

export const getAnimalByTag = createSelector(
  selectAnimals,
  (animals: Animal[], props: { tagNumber: string }) => {
    return animals.find((animal) => animal.tagNumber === props.tagNumber);
  }
);

export const getDams = createSelector(selectAnimals, (animals: Animal[]) => {
  return animals.filter(
    (animal) => animal.gender === Gender.Female && age(animal.birthDate) > 2
  );
});

export const getMaleOver36Months = createSelector(
  selectAnimals,
  (animals: Animal[]) => {
    return animals.filter(
      (animal) =>
        animal.gender === Gender.Male && age(animal.birthDate, 'months') > 36
    );
  }
);

export const getCalves = createSelector(
  selectAnimals,
  (animals: Animal[], props: { tagNumber: string }) => {
    return animals.filter((animal) => animal.dam.tagNumber === props.tagNumber);
  }
);

export const getUnregisteredCalves = createSelector(
  selectAnimals,
  (animals: Animal[]) => {
    return animals.filter((animal) => !animal.registered);
  }
);
