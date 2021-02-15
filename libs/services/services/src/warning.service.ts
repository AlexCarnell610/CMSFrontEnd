import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IToast {
  header: string;
  body?: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class WarningService {
  private _toasts: BehaviorSubject<IToast> = new BehaviorSubject(null);
  private _result: BehaviorSubject<boolean>;
  private areYouSureText = 'Are you sure you want to continue';
  constructor() {}

  public show(toast: IToast) {
    if (!toast.body) {
      this.toasts.next({ ...toast, body: this.areYouSureText });
    } else {
      this._toasts.next(toast);
    }
    this._result = new BehaviorSubject(null);
    return this._result;
  }

  public get toasts() {
    return this._toasts;
  }

  public setResult(result: boolean) {
    this._result.next(result);
    this._result.complete();
  }
}
