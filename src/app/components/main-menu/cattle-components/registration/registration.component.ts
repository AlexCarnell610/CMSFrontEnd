import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { IAnimal } from '@cms-interfaces';
import {
  AnimalUpdateService,
  LoadingPaneService,
  WarningService,
} from '@cms-services';

@Component({
  selector: 'cms-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public pageName = PageURLs.Registration;

  constructor(
    private readonly router: Router,
    private readonly warningService: WarningService,
    private readonly animalUpdateService: AnimalUpdateService,
    private readonly loadingPaneService: LoadingPaneService
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

  private markAsRegistered(animal: IAnimal) {
    this.animalUpdateService
      .updateAnimal(animal.tagNumber, { registered: true })
      .then(() => {
        this.loadingPaneService.setLoadingState(false);
      });
  }
}
