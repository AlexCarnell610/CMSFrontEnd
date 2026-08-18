import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { IAnimal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getCalves } from '@cms-ngrx/animal';
import { ScreenSizeService } from '@cms-services';
import { Store } from '@ngrx/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'cms-birth',
  templateUrl: './birth.component.html',
  styleUrls: ['./birth.component.scss'],
  standalone: false,
})
export class BirthComponent {
  public pageName = PageURLs.Births;
  public $selectedAnimal: BehaviorSubject<IAnimal> = new BehaviorSubject(null);
  public $calves: Observable<IAnimal[]>;
  public isAdd: boolean;
  private calvesSelected: Array<IAnimal> = [];
  constructor(
    private readonly router: Router,
    private readonly modalSerivce: NgxSmartModalService,
    public readonly screenService: ScreenSizeService,
    public readonly store: Store<RootState>
  ) {}

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  backToDam() {
    if (this.calvesSelected.length > 0) {
      this.animalSelected(this.calvesSelected.pop());
    }
  }

  public addBirth() {
    this.isAdd = true;
    this.modalSerivce.get(Modals.Birth).open();
  }

  hasSelectedCalf(){
    return this.calvesSelected.length > 0
  }

  public editBirth() {
    this.isAdd = false;
    this.modalSerivce.get(Modals.Birth).open();
  }

  listAnimalSelected(animal: IAnimal) {
    this.calvesSelected = []
    this.animalSelected(animal)
  }

  public animalSelected(animal: IAnimal) {
    this.$selectedAnimal.next(animal);
    if (animal) {
      this.$calves = this.store.select(getCalves(animal.tagNumber));
    }
  }

  calfSelected(animal: IAnimal) {
    this.calvesSelected.push(this.$selectedAnimal.value);
    this.animalSelected(animal);
  }

  public getCSS() {
    return this.screenService.isSmallScreen
      ? 'small-screen-display'
      : 'cms-sticky';
  }
}
