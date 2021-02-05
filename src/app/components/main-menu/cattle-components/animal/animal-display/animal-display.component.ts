import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Animal, Bull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getAnimalByTag } from '@cms-ngrx/animal';
import { selectBullByTag } from '@cms-ngrx/bull';
import { ScreenSizeService } from '@cms-services';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cms-animal-display',
  templateUrl: './animal-display.component.html',
  styleUrls: ['./animal-display.component.css'],
})
export class AnimalDisplayComponent implements OnInit, OnDestroy {
  @Input() $selectedAnimal: BehaviorSubject<Animal> = new BehaviorSubject(null);
  @Output() editAnimal: EventEmitter<Animal> = new EventEmitter();
  public $sire: Observable<Bull>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly store: Store<RootState>,
    public readonly screenService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.trackSire();
  }

  public getCSS() {
    return this.screenService.isSmallScreen
      ? 'small-screen-display'
      : 'cms-sticky';
  }

  public viewDam() {
    this.subscriptions.add(
      this.store
        .pipe(
          select(getAnimalByTag, {
            tagNumber: this.$selectedAnimal.value.dam.tagNumber,
          })
        )
        .subscribe((dam) => {
          this.$selectedAnimal.next(dam);
        })
    );
  }

  public openEditModal() {
    this.editAnimal.emit(this.$selectedAnimal.value);
  }

  private trackSire() {
    this.subscriptions.add(
      this.$selectedAnimal.subscribe((animal) => {
        if (animal) {
          this.$sire = this.store.pipe(
            select(selectBullByTag, { tagNumber: animal.sire.tagNumber })
          );
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
