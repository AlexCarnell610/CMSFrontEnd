import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Modals } from '@cms-enums';
import {
  IToast,
  WarningService,
} from 'libs/services/services/src/warning.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'cms-warning-display',
  templateUrl: './warning-display.component.html',
  styleUrls: ['./warning-display.component.css'],
})
export class WarningDisplayComponent implements OnInit, AfterViewInit {
  @Output() continue: EventEmitter<Observable<boolean>> = new EventEmitter();
  public toast: IToast = null;
  constructor(
    public readonly warningService: WarningService,
    private readonly modals: NgxSmartModalService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.warningService.toasts.subscribe((toast) => {
      if (toast) {
        this.toast = toast;
        this.modals.get(Modals.Warning).open(true);
      }
    });
  }

  public continueClick() {
    this.warningService.setResult(true);
    this.modals.get(Modals.Warning).close();
  }

  public cancelClick() {
    this.warningService.setResult(false);
    this.modals.get(Modals.Warning).close();
  }
}
