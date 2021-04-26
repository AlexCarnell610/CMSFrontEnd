import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingPaneService {
  constructor() {}
  private _loadingState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private counter = 0;

  public setLoadingState(state: boolean) {
    if (state) {
      this.counter++;
    } else {
      this.counter--;
    }

    this._loadingState.next(this.counter > 0);
  }

  public stopLoading() {
    this.counter = 0;
    this._loadingState.next(false);
  }

  public get currentLoadingState(): BehaviorSubject<boolean> {
    return this._loadingState;
  }
}
