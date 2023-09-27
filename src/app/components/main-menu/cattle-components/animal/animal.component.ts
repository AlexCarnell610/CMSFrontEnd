import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Modals, PageURLs } from '@cms-enums';
import { IAnimal, IBull } from '@cms-interfaces';
import { ScreenSizeService } from '@cms-services';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

const YOUNG_TO_OLD = 'youngToOld';
const OLD_TO_YOUNG = 'oldToYoung';
@Component({
  selector: 'cms-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {
  public pageName = PageURLs.Animals;
  public $selectedAnimal: BehaviorSubject<IAnimal> = new BehaviorSubject(null);
  public isAdd: boolean;
  public $sire: Observable<IBull>;
  public selectedAnimal: IAnimal;
  private previousAnimals: IAnimal[] = [];
  public sortingFormGroup: FormGroup;
  public youngToOld: Observable<boolean>;
  public oldToYoung: Observable<boolean>;

  constructor(
    private readonly router: Router,
    private readonly modalService: NgxSmartModalService,
    public readonly screenService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.sortingFormGroup = new FormGroup({
      sortRadio: new FormControl(''),
    });

    this.youngToOld = this.radioSortControl.valueChanges.pipe(
      map((val) => val === YOUNG_TO_OLD)
    );
    this.oldToYoung = this.radioSortControl.valueChanges.pipe(
      map((val) => val === OLD_TO_YOUNG)
    );
  }

  public backToMain() {
    this.router.navigate([PageURLs.MainMenu]);
  }

  public addAnimal() {
    this.modalService.get(Modals.Animal).setData({ isAdd: true });
    this.modalService.get(Modals.Animal).open();
  }

  public addSire() {
    const sireModal = this.modalService.get(Modals.Sire);
    sireModal.setData({ isAdd: true, persistData: true }, true);
    sireModal.open();
  }

  public editAnimal() {
    this.$selectedAnimal.pipe(take(1)).subscribe((animal) => {
      const modal = this.modalService.get(this.getModal(animal));
      modal.setData({ isAdd: false, persistData: true, bull: animal });
      modal.open();
    });
  }

  public animalSelected(event: IAnimal) {
    this.previousAnimals = []
    this.$selectedAnimal.next(event);
  }

  public goToDam(dam: IAnimal): void {
    this.previousAnimals.push(this.$selectedAnimal.value);
    this.$selectedAnimal.next(dam);
  }

  get OLD_TO_YOUNG(): string {
    return OLD_TO_YOUNG;
  }

  get YOUNG_TO_OLD(): string {
    return YOUNG_TO_OLD;
  }

  public get showGoToChild(): boolean {
    return this.previousAnimals.length > 0;
  }

  public goToPreviousAnimal(): void {
    this.$selectedAnimal.next(this.previousAnimals.pop());
  }

  private getModal(animal): Modals {
    return animal.dam ? Modals.Animal : Modals.Sire;
  }

  private get radioSortControl(): AbstractControl {
    return this.sortingFormGroup.get('sortRadio');
  }
}
