import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Animal, Bull, isBull } from '@cms-interfaces';
import { ScreenSizeService } from '@cms-services';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'cms-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent {
  public pageName = PageURLs.Animals;
  public $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  public isAdd: boolean;
  public $sire: Observable<Bull>;

  constructor(
    private readonly router: Router,
    private readonly modalService: NgxSmartModalService,
    public readonly screenService: ScreenSizeService
  ) {}

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public addAnimal() {
    this.isAdd = true;
    this.modalService.get(Modals.Animal).open();
  }

  public editAnimal() {
    this.isAdd = false;
    this.modalService.get(Modals.Animal).open();
  }

  public animalSelected(event: Animal) {
    this.$selectedAnimal.next(event);
  }
  public isntBull(animal): boolean {
    return !isBull(animal);
  }
}
