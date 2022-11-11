import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { IAnimal, IBull } from '@cms-interfaces';
import { ScreenSizeService } from '@cms-services';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'cms-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent {
  public pageName = PageURLs.Animals;
  public $selectedAnimal: BehaviorSubject<IAnimal> = new BehaviorSubject(null);
  public isAdd: boolean;
  public $sire: Observable<IBull>;
  public selectedAnimal: IAnimal;
  private previousAnimals: IAnimal[] = [];

  constructor(
    private readonly router: Router,
    private readonly modalService: NgxSmartModalService,
    public readonly screenService: ScreenSizeService
  ) {}

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public addAnimal() {
    this.modalService
      .get(Modals.Animal)
      .setData({ isAdd: true, persistData: true });
    this.modalService.get(Modals.Animal).open();
  }

  public addSire() {
    const sireModal = this.modalService.get(Modals.Sire);
    sireModal.setData({ isAdd: true }, true);
    sireModal.open();
  }

  public editAnimal() {
    this.$selectedAnimal
      .pipe(take(1))
      .subscribe((animal) => {
        const modal = this.modalService.get(this.getModal(animal));
        modal.setData({ isAdd: false, persistData: true });
        modal.open();
      });
  }

  public animalSelected(event: IAnimal) {
    this.$selectedAnimal.next(event);
  }

  public goToDam(dam: IAnimal): void {
    this.previousAnimals.push(this.$selectedAnimal.value);
    this.animalSelected(dam);
  }

  public get showGoToChild(): boolean {
    return this.previousAnimals.length > 0;
  }

  public goToPreviousAnimal(): void {
    this.animalSelected(this.previousAnimals.pop());
  }

  private getModal(animal): Modals {
    return animal.dam ? Modals.Animal : Modals.Sire;
  }
}
