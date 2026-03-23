import { Pipe, PipeTransform } from '@angular/core';
import { Animal, IAnimal, isAnimal } from '@cms-interfaces';

@Pipe({
    name: 'animalDobSort',
    standalone: false
})
export class AnimalDobSortPipe implements PipeTransform {
  transform(
    animals: Animal[],
    oldToYoung: boolean,
    youngToOld: boolean
  ): Animal[] {
    
      if (oldToYoung) {
        animals.sort(this.sortOldToYoung);
      } else if (youngToOld) {
        animals.sort(this.sortYoungToOld);
      }
      
      return animals;
  
  }

  private sortOldToYoung(animalA: IAnimal, animalB: IAnimal): number {
    return isAnimal(animalA)
      ? animalA.birthDate.diff(animalB.birthDate, 'days').days
      : 1;
  }

  private sortYoungToOld(animalA: IAnimal, animalB: IAnimal): number {
    return isAnimal(animalA)
      ? animalB.birthDate.diff(animalA.birthDate, 'days').days
      : 1;
  }
}
