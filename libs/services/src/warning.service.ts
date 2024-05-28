import { Injectable } from '@angular/core';
import { Modals } from '@cms-enums';
import { IAnimal } from '@cms-interfaces';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

export interface IToast {
  header: string;
  body?: string;
  buttonText?: string;
  isError?: boolean;
  delay?: number;
  animal?: IAnimal;
  showCloseButton?: boolean;
  isYesNo?:boolean,
  allowEscaping?:boolean
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
    isYesNo: false,
    allowEscaping: false
  };
  private complete: boolean = true;
  constructor(private readonly modals: NgxSmartModalService) {}

  public show(
    toast: IToast,
    animal: IAnimal = null,
    complete = true
  ): BehaviorSubject<boolean> {
    this.complete = complete;
    this._result = new BehaviorSubject(null);
    const warningModal = this.modals.get(Modals.Warning);
    if (warningModal.isVisible()) {
      warningModal.onAnyCloseEventFinished.pipe(take(1)).subscribe(() => {
        this.showModal(warningModal, toast, animal);
      });
    } else {
      this.showModal(warningModal, toast, animal);
    }

    return this._result;
  }

  private showModal(
    warningModal: NgxSmartModalComponent,
    toast: IToast,
    animal: IAnimal = null
  ): void {
    warningModal.layerPosition = this.modals.getHigherIndex();
    warningModal.setData({ ...this.defaultError, ...toast, animal }).open();
  }

  public setResult(result: boolean) {
    this._result.next(result);
    if (this.complete) {
      this._result.complete();
    }
  }
}
