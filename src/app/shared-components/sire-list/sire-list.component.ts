import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { IBreedCode, IBull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectBulls } from '@cms-ngrx/bull';
import { AnimalBreedService } from '@cms-services';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { BirthFormControls } from 'src/app/components/modals/birth-modal/birth-modal.component';
import { takeWhile } from 'rxjs/operators';
import { Modals } from '@cms-enums';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'cms-sire-list',
  templateUrl: './sire-list.component.html',
  styleUrls: ['./sire-list.component.scss'],
})
export class SireListComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() selectedBreed$: Observable<string>;
  @Input() isAdd: boolean;
  @Output() sireAdded: EventEmitter<boolean> = new EventEmitter();
  breedSelected: boolean = false;
  private $sires: Observable<IBull[]>;
  public $filteredSires: BehaviorSubject<IBull[]> = new BehaviorSubject(null);
  public breeds: IBreedCode[] = [];
  constructor(
    private readonly breedService: AnimalBreedService,
    private readonly store: Store<RootState>,
    private readonly modalService: NgxSmartModalService
  ) {}

  ngOnInit(): void {
    this.$sires = this.store.pipe(select(selectBulls));
    this.setInitialSires();
    this.trackBreedChange();

    this.sire.valueChanges.subscribe((sire) => {
      if (sire === 'addNew') {
        this.sire.setValue('');
        this.addSire();
      }
    });
  }

  private addSire(): void {
    this.sire.markAsPristine();
    const sireModal = this.modalService.get(Modals.Sire);
    sireModal.setData({ isAdd: this.isAdd }, true);

    sireModal.open();
  }

  private trackBreedChange(): void {
    combineLatest([this.$sires, this.selectedBreed$]).subscribe(
      ([sires, breed]: [IBull[], string]) => {
        this.breedSelected = true;

        this.$filteredSires.next(
          breed?.length === 0
            ? sires
            : sires.filter((sire) => {
                const selectedBreed = breed?.toUpperCase();
                const sireBreed = sire.breed?.toUpperCase();
                return (
                  breed &&
                  (sireBreed === selectedBreed ||
                    sireBreed ===
                      this.breedService.getCodeFromBreed(selectedBreed))
                );
              })
        );
      }
    );
  }

  private setInitialSires() {
    this.$sires
      .pipe(takeWhile(() => !this.breedSelected, true))
      .subscribe((sires) => {
        this.$filteredSires.next(sires);
      });
  }

  public get sire() {
    return this.parentForm.get(BirthFormControls.Sire);
  }

}
