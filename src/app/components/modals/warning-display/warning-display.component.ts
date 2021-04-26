import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Modals } from '@cms-enums';
import { IToast, WarningService } from '@cms-services';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-warning-display',
  templateUrl: './warning-display.component.html',
  styleUrls: ['./warning-display.component.css'],
})
export class WarningDisplayComponent implements AfterViewInit, OnDestroy {
  public toast: IToast = null;
  private subs = new Subscription();
  constructor(
    public readonly warningService: WarningService,
    private readonly modals: NgxSmartModalService
  ) {}

  ngAfterViewInit() {
    const modal = this.modals.get(Modals.Warning);
    this.subs.add(
      modal.onDataAdded.subscribe((data) => {
        this.toast = data;
      })
    );
    this.subs.add(
      modal.onAnyCloseEvent.subscribe(() => {
        modal.removeData();
      })
    );
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
