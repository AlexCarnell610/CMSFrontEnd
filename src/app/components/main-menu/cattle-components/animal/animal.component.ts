import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Animal, Bull } from '@cms-interfaces';
import { ScreenSizeService } from '@cms-services';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'cms-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent {
  public pageName = PageURLs.Animals;
  public $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  public isAdd: boolean;
  public $sire: Observable<Bull>;
  public selectedAnimal: Animal;
  private previousAnimals: Animal[] = [];

  constructor(
    private readonly router: Router,
    private readonly modalService: NgxSmartModalService,
    public readonly screenService: ScreenSizeService
  ) {}

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public addAnimal() {
    this.modalService.get(Modals.Animal).setData({ isAdd: true });
    this.modalService.get(Modals.Animal).open();
  }

  public editAnimal() {
    this.modalService.get(Modals.Animal).setData({ isAdd: false });
    this.modalService.get(Modals.Animal).open();
  }

  public animalSelected(event: Animal) {
    this.$selectedAnimal.next(event);
  }

  public goToDam(dam: Animal): void {
    this.previousAnimals.push(this.$selectedAnimal.value);
    this.animalSelected(dam);
  }

  public get showGoToChild(): boolean {
    return this.previousAnimals.length > 0;
  }

  public goToPreviousAnimal(): void {
    this.animalSelected(this.previousAnimals.pop());
  }
}
