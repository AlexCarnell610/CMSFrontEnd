import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private _screenWidth: number;
  private smallScreenWidth = 1000;
  private $_isSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  constructor() {
    this.screenWidth = window.innerWidth;
  }

  get screenWidth() {
    return this._screenWidth;
  }

  set screenWidth(screenWidth: number) {
    this._screenWidth = screenWidth;
    if (this.$_isSmallScreen.value !== this.isSmallScreen) {
      this.$_isSmallScreen.next(this.isSmallScreen);
    }
  }

  get isSmallScreen() {
    return this.screenWidth <= this.smallScreenWidth;
  }

  public isSmallScreenObs(): Observable<boolean> {
    return this.$_isSmallScreen.asObservable();
  }
}
