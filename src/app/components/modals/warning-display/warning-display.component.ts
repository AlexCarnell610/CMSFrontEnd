import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Modals } from '@cms-enums';
import {
  IToast,
  WarningService,
} from 'libs/services/services/src/warning.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cms-warning-display',
  templateUrl: './warning-display.component.html',
  styleUrls: ['./warning-display.component.css'],
})
export class WarningDisplayComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Output() continue: EventEmitter<Observable<boolean>> = new EventEmitter();
  public toast: IToast = null;
  private subs = new Subscription();
  constructor(
    public readonly warningService: WarningService,
    private readonly modals: NgxSmartModalService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.subs.add(
      this.modals.get(Modals.Warning).onDataAdded.subscribe((data) => {
        this.toast = data;
      })
    );
    // this.warningService.toasts.subscribe((toast) => {
    //   if (toast) {
    //     this.toast = toast;
    //     this.modals.get(Modals.Warning).open(true);
    //   }
    // });
  }

  public continueClick() {
    this.warningService.setResult(true);
    this.modals.get(Modals.Warning).close();
  }

  public cancelClick() {
    this.warningService.setResult(false);
    this.modals.get(Modals.Warning).close();
  }

  public getCSSForButton() {
    return this.toast?.isError ? 'btn-danger' : 'btn-warning';
  }

  public getCSSForWarning() {
    return this.toast?.isError ? 'error' : 'warning';
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
