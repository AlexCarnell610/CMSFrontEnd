import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { Animal, isBull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { select, Store } from '@ngrx/store';
import { getAnimalByTag } from 'libs/ngrx/src/lib/selectors/src/animal.selectors';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'cms-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  public pageName = PageURLs.Animals;
  public selectedAnimal: Animal = null;
  public isAdd: boolean;

  constructor(
    private readonly router: Router,
    private readonly modalService: NgxSmartModalService,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    
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
    console.warn(event);
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
