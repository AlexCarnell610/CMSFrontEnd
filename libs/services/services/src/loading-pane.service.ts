import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingPaneService {

  constructor() { }

  private _isLoadingState: boolean = false;

  public set loadingState(state: boolean){
    this._isLoadingState = state;
    console.warn("Loading", this._isLoadingState);
  }

}
