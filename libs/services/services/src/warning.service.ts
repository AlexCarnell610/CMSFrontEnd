import { Injectable } from '@angular/core';
import { Animal } from '@cms-interfaces';
import { BehaviorSubject } from 'rxjs';

export interface IToast {
  header: string;
  body?: string;
  buttonText?: string;
  isError?: boolean;
  delay?: number;
  animal?: Animal;
}

@Injectable({
  providedIn: 'root',
})
export class WarningService {
  private _toasts: BehaviorSubject<IToast> = new BehaviorSubject(null);
  private _result: BehaviorSubject<boolean>;
  private defaultBodyText = 'Are you sure you want to continue';
  private defaultButtonText = 'Continue anyway';
  private defaultError = {
    body: this.defaultBodyText,
    buttonText: this.defaultButtonText,
    isError: false,
  };
  constructor() {}

  public show(toast: IToast, animal: Animal = null) {
    this.toasts.next({ ...this.defaultError, ...toast, animal });

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
