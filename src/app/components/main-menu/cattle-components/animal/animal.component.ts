import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Animal, Bull, isBull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { ScreenSizeService } from '@cms-services';
import { Store } from '@ngrx/store';
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
  public animalToEdit: Animal = null;

  constructor(
    private readonly router: Router,
    private readonly modalService: NgxSmartModalService,
    public readonly screenService: ScreenSizeService,
    private readonly store: Store<RootState>
  ) {}

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public addAnimal() {
    console.warn('ADD');

    this.isAdd = true;
    this.modalService.get(Modals.Animal).open();
  }

  public editAnimal(animal: Animal = null) {
    this.isAdd = false;
    // if (animal) {
    //   this.$selectedAnimal.next(animal);
    // }
    this.modalService.get(Modals.Animal).open();
  }

  public animalSelected(event: Animal) {
    this.$selectedAnimal.next(event);

    // this.store.pipe(
    //   select(getAnimalByTag, { tagNumber: event.tagNumber })
    // );
  }
  public isntBull(animal): boolean {
    return !isBull(animal);
  }
  public getAnimal() {
    return this.animalToEdit ? this.animalToEdit : this.$selectedAnimal.value;
  }

  public editAnimalPlease(event) {
    this.animalToEdit = event;
    // this.modalService.create();
    console.error('EDITTTTTT', event);
  }
}
