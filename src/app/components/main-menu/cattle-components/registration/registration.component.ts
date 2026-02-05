import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { IAnimal } from '@cms-interfaces';
import {
  AnimalUpdateService,
  LoadingPaneService,
  ScreenSizeService,
  WarningService,
} from '@cms-services';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'cms-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    standalone: false
})
export class RegistrationComponent {
  public pageName = PageURLs.Registration;
  public $selectedAnimal: BehaviorSubject<IAnimal> = new BehaviorSubject(null);

  constructor(
    private readonly router: Router,
    private readonly warningService: WarningService,
    private readonly animalUpdateService: AnimalUpdateService,
    private readonly loadingPaneService: LoadingPaneService,
    public readonly screenService: ScreenSizeService,
    private readonly modalService: NgxSmartModalService
  ) {}

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public registerAnimal(animal: IAnimal) {
    this.warningService
      .show({
        header: `Confirm reigstration of ${animal.tagNumber}`,
        buttonText: 'Continue',
        body: '',
      })
      .subscribe((result) => {
        if (result) {
          this.loadingPaneService.setLoadingState(true);
          this.markAsRegistered(animal);
        }
      });
  }

  public animalSelected(event: IAnimal) {
    this.$selectedAnimal.next(event);
  }

  public editAnimal() {
    this.$selectedAnimal.pipe(take(1)).subscribe((animal) => {
      const modal = this.modalService.get(this.getModal(animal));
      modal.setData({ isAdd: false, persistData: true });
      modal.open();
    });
  }

  private getModal(animal): Modals {
    return animal.dam ? Modals.Animal : Modals.Sire;
  }

  private markAsRegistered(animal: IAnimal) {
    this.animalUpdateService
      .updateAnimal(animal.tagNumber, { registered: true })
      .then(() => {
        this.loadingPaneService.setLoadingState(false);
      });
  }
}
