import { Gender } from '@cms-enums';
import { age, IAnimal, UNKNOWN_DAM_TAG } from '@cms-interfaces';
import { createSelector } from '@ngrx/store';
import { selectAll } from './animals.reducer';

export const selectAnimals = createSelector(selectAll, (animals) => {
  return animals.filter((animal) => !animal.tagNumber.includes("UK000000"));
});

export const getAnimalByTag = (tagNumber: string) =>
  createSelector(selectAnimals, (animals: IAnimal[]) => {
    return animals.find((animal) => animal.tagNumber === tagNumber);
  });

export const getDams = createSelector(selectAnimals, (animals: IAnimal[]) => {
  return animals.filter(
    (animal) =>
      animal.gender === Gender.Female &&
      (age(animal.birthDate) > 2 || animal.dam.tagNumber == UNKNOWN_DAM_TAG)
  );
});

export const getMaleOver36Months = createSelector(
  selectAnimals,
  (animals: IAnimal[]) => {
    return animals.filter(
      (animal) =>
        animal.gender === Gender.Male &&
        age(animal.birthDate, 'months') > 36 &&
        animal.weightData.findIndex((weight) => weight.isSaleWeight) == -1
    );
  }
);

export const getCalves = (tagNumber: string) =>
  createSelector(selectAnimals, (animals: IAnimal[]) => {
    return animals.filter((animal) => animal.dam.tagNumber === tagNumber);
  });

export const getUnregisteredCalves = createSelector(
  selectAnimals,
  (animals: IAnimal[]) => {
    return animals.filter((animal) => !animal.registered);
  }
);
