import { Gender } from '@cms-enums';
import { age, IAnimal } from '@cms-interfaces';
import { createSelector } from '@ngrx/store';
import { selectAll } from './animals.reducer';

export const selectAnimals = createSelector(selectAll, (animals) => {
  return animals.filter((animal) => animal.tagNumber !== 'UK000000000000');
});

export const getAnimalByTag = (tagNumber: string) =>
  createSelector(selectAnimals, (animals: IAnimal[]) => {
    return animals.find((animal) => animal.tagNumber === tagNumber);
  });

export const getDams = createSelector(selectAnimals, (animals: IAnimal[]) => {
  return animals.filter(
    (animal) =>
      animal.gender === Gender.Female &&
      (age(animal.birthDate) > 2 || animal.dam.tagNumber == 'UK000000000000')
  );
});

export const getMaleOver36Months = createSelector(
  selectAnimals,
  (animals: IAnimal[]) => {
    return animals.filter(
      (animal) =>
        animal.gender === Gender.Male &&
        age(animal.birthDate, 'months') > 36 &&
        animal.weightData.findIndex((weight) => weight.weightType.isSale) == -1
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
