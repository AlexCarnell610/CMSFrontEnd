import { Injectable } from '@angular/core';
import { ICullUpdate } from '@cms-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CullUpdateService {
  private _cullUpdate: ICullUpdate[] = [];
  constructor() {}

  public getCullUpdate(): ICullUpdate[] {
    return this._cullUpdate;
  }

  set cullUpdate(update: any) {
    this._cullUpdate = [];
    let interUpdate = [];
    if (update !== 'error') {
      Object.entries(update).forEach(([key, value]: [string, any]) => {
        let convertedUpdate: ICullUpdate = {
          score: value.score ? value.score : null,
          tagNumber: key,
          age: value.age,
          aliveCalves: value.aliveCalves ? value.aliveCalves : null,
          calfDailyWeightGain: value.calfAvgDailyWeightGain
            ? value.calfAvgDailyWeightGain
            : null,
          totalCalves: value.calvesCount ? value.calvesCount : 0,
        };
        interUpdate.push(convertedUpdate);
      });
      this._cullUpdate = interUpdate;
    }
  }
}