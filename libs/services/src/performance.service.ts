import { Injectable } from '@angular/core';
import { IAnimal } from '@cms-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor() { }

  calculateAvgDailyWeightGain(animal: IAnimal): number{
    const weights = animal.weightData;
    
      const initialWeight = weights[0];
      const lastWeight = weights[weights.length - 1];
      const weightGain = lastWeight.weight - initialWeight.weight;
      const dateDiff = lastWeight.weightDate.diff(
        initialWeight.weightDate,
        'days'
      );
      return (weightGain / dateDiff); 
  }
}
