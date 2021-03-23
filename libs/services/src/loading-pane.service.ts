import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingPaneService {
  constructor() {}
  private _loadingState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public setLoadingState(state: boolean) {
    this._loadingState.next(state);
  }

  public get currentLoadingState(): BehaviorSubject<boolean> {
    return this._loadingState;
  }
}
