import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Animal, Bull, isBull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getAnimalByTag } from '@cms-ngrx/animal';
import { selectBullByTag } from '@cms-ngrx/bull';
import { select, Store } from '@ngrx/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'cms-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  public pageName = PageURLs.Animals;
  public selectedAnimal: Animal = null;
  public isAdd: boolean;
  public $sire: Observable<Bull>;

  constructor(
    private readonly router: Router,
    private readonly modalService: NgxSmartModalService,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    if (this.selectedAnimal) {
      console.warn("HERE");
      //subscirbe to selected animal changes and then should work
      this.$sire = this.store.pipe(select(selectBullByTag, {tagNumber: this.selectedAnimal.sire.tagNumber}))
    }
  }

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

  public animalSelected(event) {
    // console.warn(event);
    //this needs to turn into a behaviour subject then it should work
    this.selectedAnimal = event;
  }
  public isntBull(animal): boolean {
    return !isBull(animal);
  }

  public viewDam() {
    this.store
      .pipe(
        select(getAnimalByTag, { tagNumber: this.selectedAnimal.dam.tagNumber })
      )
      .subscribe((dam) => {
        this.selectedAnimal = dam;
      });
  }
}
