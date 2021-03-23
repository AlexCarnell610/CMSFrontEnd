import { Injectable } from '@angular/core';
import { Modals } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject } from 'rxjs';

export interface IToast {
  header: string;
  body?: string;
  buttonText?: string;
  isError?: boolean;
  delay?: number;
  animal?: Animal;
  showCloseButton?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WarningService {
  private _result: BehaviorSubject<boolean>;
  private defaultBodyText = 'Are you sure you want to continue?';
  private defaultButtonText = 'Continue anyway';
  private defaultError = {
    body: this.defaultBodyText,
    buttonText: this.defaultButtonText,
    isError: false,
    showCloseButton: true,
  };
  constructor(private readonly modals: NgxSmartModalService) {}

  public show(toast: IToast, animal: Animal = null) {
    this.modals
      .get(Modals.Warning)
      .setData({ ...this.defaultError, ...toast, animal })
      .open();

    this._result = new BehaviorSubject(null);
    return this._result;
  }

  public setResult(result: boolean) {
    this._result.next(result);
    this._result.complete();
  }
}
