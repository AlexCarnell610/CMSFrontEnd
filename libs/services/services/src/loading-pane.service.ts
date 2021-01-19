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
  private _loadingState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public setLoadingState(state: boolean){
    // sessionStorage.setItem("FUCK", "FUCK");
    this._loadingState.next(state);
    // console.warn("Loading", this._isLoadingState.value);
  }

  public get currentLoadingState(): BehaviorSubject<boolean>{
    return this._loadingState
  }

}
