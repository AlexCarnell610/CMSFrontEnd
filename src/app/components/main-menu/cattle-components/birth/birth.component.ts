import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cms-birth',
  templateUrl: './birth.component.html',
  styleUrls: ['./birth.component.css'],
})
export class BirthComponent {
  public pageName = PageURLs.Births;
  public $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  public isAdd: boolean;
  constructor(
    private readonly router: Router,
    private readonly modalSerivce: NgxSmartModalService
  ) {}

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public addBirth() {
    this.isAdd = true;
    this.modalSerivce.get(Modals.Birth).open();
  }

  public editBirth() {
    this.isAdd = false;
    this.modalSerivce.get(Modals.Birth).open();
  }

  public animalSelected(animal: Animal) {
    this.$selectedAnimal.next(animal);
  }
}
