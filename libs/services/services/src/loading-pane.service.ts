import { Injectable } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingPaneService {

  constructor(private readonly modalService: NgxSmartModalService) {
    // this._isLoadingState.subscribe(state => {
    //   state ? this.modalService.getModal(Modals.Weight).open() : this.modalService.getModal(Modals.Weight).close()
    // })
   }

  private _isLoadingState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public set loadingState(state: boolean){
    // sessionStorage.setItem("FUCK", "FUCK");
    this._isLoadingState.next(state);
    // console.warn("Loading", this._isLoadingState.value);
  }

}
