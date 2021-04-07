import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import {
  AnimalUpdateService,
  LoadingPaneService,
  WarningService,
} from '@cms-services';

@Component({
  selector: 'cms-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  public pageName = PageURLs.Registration;

  constructor(
    private readonly router: Router,
    private readonly warningService: WarningService,
    private readonly animalUpdateService: AnimalUpdateService,
    private readonly loadingPaneService: LoadingPaneService
  ) {}

  ngOnInit(): void {}

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public registerAnimal(animal: Animal) {
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

  private markAsRegistered(animal: Animal) {
    this.animalUpdateService
      .updateAnimal(animal.tagNumber, { registered: true })
      .then(() => {
        this.loadingPaneService.setLoadingState(false);
        console.warn('UPDATED');
      });
  }
}
