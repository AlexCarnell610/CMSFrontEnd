import { Injectable } from '@angular/core';
import { ICullUpdate } from '@cms-interfaces';
import { HttpService } from '@cms-services/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoadingPaneService } from './loading-pane.service';

@Injectable({
  providedIn: 'root',
})
export class CullUpdateService {
  private _cullUpdate: BehaviorSubject<ICullUpdate[]> = new BehaviorSubject([]);
  constructor(
    private readonly httpService: HttpService,
    private readonly loadingService: LoadingPaneService
  ) {}

  public getCullUpdate(): BehaviorSubject<ICullUpdate[]> {
    return this._cullUpdate;
  }

  set cullUpdate(update: any) {
    if (update !== 'error') {
      this._cullUpdate.next(this.convertUpdate(update));
    } else {
      this.loadingService.setLoadingState(true);
      this.httpService
        .getCullUpdate()
        .pipe(take(1))
        .subscribe((httpUpdate) => {
          this._cullUpdate.next(this.convertUpdate(httpUpdate));
          this.loadingService.setLoadingState(false);
        });
    }
  }

  private convertUpdate(update: any): ICullUpdate[] {
    let interUpdate = [];
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
    console.warn("TEST");
    
    return interUpdate;
  }
}
