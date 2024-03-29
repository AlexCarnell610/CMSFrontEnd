import { Pipe, PipeTransform } from '@angular/core';
import { IAnimal, isAnimal } from '@cms-interfaces';

@Pipe({
  name: 'animalDobSort',
})
export class AnimalDobSortPipe implements PipeTransform {
  transform(
    animals: IAnimal[],
    oldToYoung: boolean,
    youngToOld: boolean
  ): IAnimal[] {
    if (oldToYoung) {
      animals.sort(this.sortOldToYoung);
    } else if (youngToOld) {
      animals.sort(this.sortYoungToOld);
    }

    return animals;
  }

  private sortOldToYoung(animalA: IAnimal, animalB: IAnimal): number {
    return isAnimal(animalA)
      ? animalA.birthDate.diff(animalB.birthDate, 'days')
      : 1;
  }

  private sortYoungToOld(animalA: IAnimal, animalB: IAnimal): number {
    return isAnimal(animalA)
      ? animalB.birthDate.diff(animalA.birthDate, 'days')
      : 1;
  }
}
