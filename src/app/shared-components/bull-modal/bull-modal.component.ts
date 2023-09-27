import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Modals } from '@cms-enums';
import { IBull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { AddBull, LoadBull, selectBulls, UpdateBull } from '@cms-ngrx/bull';
import {
  AnimalBreedService,
  LoadingPaneService,
  WarningService,
} from '@cms-services';
import { breedValidator } from '@cms-validators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'cms-bull-modal',
  templateUrl: './bull-modal.component.html',
  styleUrls: ['./bull-modal.component.scss'],
})
export class BullModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() breedControlName: string;
  @Input() sireControlName: string;
  @Output() sireAdded: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('errorPop') errorPopover: NgbPopover;
  public isAdd = false;
  public bullForm = new FormGroup({});
  public isNewBull = false;

  private bull: IBull;
  private subs = new Subscription();
  private longLifeSubs = new Subscription();
  private persistData: boolean = false;
  private readyToClose = false;

  constructor(
    private readonly modalService: NgxSmartModalService,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<RootState>,
    private readonly warningService: WarningService,
    private readonly breedService: AnimalBreedService,
    private readonly loadingService: LoadingPaneService
  ) {}

  ngOnInit(): void {
    this.handleModalClose();
    this.bullForm = this.formBuilder.group({
      tagNumber: this.formBuilder.control(['UK'], {
        validators: [Validators.pattern(/^UK\d{12}$/), Validators.required],
        updateOn: 'blur',
      }),
      breed: this.formBuilder.control([''], {
        validators: [
          Validators.compose([
            Validators.required,
            breedValidator(this.breedService),
          ]),
        ],
        updateOn: 'blur',
      }),
      name: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.modalService.get(Modals.Sire).onOpenFinished.subscribe(() => {
      const modalData = this.modalService.resetModalData(Modals.Sire);

      this.bull = modalData.bull;
      this.isAdd = modalData.isAdd;
      this.persistData = modalData.persistData;
      this.bullForm.reset({ tagNumber: 'UK' });
      this.breed.setValue(this.calfBreed);
      if (!this.isAdd) {
        this.setData();
        this.tag.disable();
      } else {
        this.tag.enable();
      }
    });

    this.modalService.get(Modals.Sire).onAnyCloseEventFinished.subscribe(() => {
      this.subs.unsubscribe();
    });
  }

  get tag(): AbstractControl {
    return this.bullForm.get('tagNumber');
  }

  get name(): AbstractControl {
    return this.bullForm.get('name');
  }

  get breed(): AbstractControl {
    return this.bullForm.get('breed');
  }

  public save(): void {
    this.name.markAsDirty();
    this.tag.markAsDirty();
    this.breed.markAsDirty();
    if (this.bullForm.valid) {
      if (!this.isAdd) {
        if (!this.breedService.isSameBreed(this.bull.breed, this.breed.value)) {
          const breedName = this.breedService.getBreedFromCode(
            this.breed.value
          );
          this.warningService.show({
            header: 'Breed has updated',
            body: `Continuing will update all calves breeds to ${breedName}`,
          });
        } else {
          const update: IBull = {
            ...this.bullForm.getRawValue(),
            breed: this.breedCode,
          };
          this.readyToClose = true;
          this.store.dispatch(
            new UpdateBull({
              bull: { changes: update, id: this.bull.tagNumber },
            })
          );
        }
      } else {
        this.subs.add(
          this.store.select(selectBulls).subscribe((bulls) => {
            const similarIndex = bulls.findIndex(
              (bull) =>
                bull.tagNumber === this.tag.value ||
                bull.name === this.name.value
            );
            if (similarIndex > -1 && !this.isNewBull) {
              const isSameTag =
                bulls[similarIndex].tagNumber === this.tag.value;
              this.subs.add(
                this.warningService
                  .show({
                    header: `Bull with that ${
                      isSameTag ? 'tag' : 'name'
                    } already exists`,
                    body: isSameTag
                      ? 'Please enter a different tag number'
                      : 'Are you sure you want to continue?',
                    isError: isSameTag,
                  })
                  .subscribe((proceed) => {
                    if (proceed) {
                      this.saveBull();
                    }
                  })
              );
            } else {
              this.saveBull();
            }
          })
        );
      }
    } else {
      this.errorPopover.open();
    }
  }

  public close(): void {
    this.modalService.get(Modals.Sire).close();
  }

  private handleModalClose(): void {
    let loadingStarted = false;
    this.longLifeSubs.add(
      this.loadingService.currentLoadingState.subscribe(
        (loading) => {
          if (loading) {
            loadingStarted = true;
          } else if (!loading && loadingStarted && this.readyToClose) {
            timer(500).subscribe(() => {
              loadingStarted = false;
              this.readyToClose = false;
              this.modalService.get(Modals.Sire).close();
            });
          }
        }
      )
    );
  }

  private get calfBreed(): string {
    return this.form?.get(this.breedControlName)?.value;
  }

  private setData(): void {
    this.bullForm.setValue({
      tagNumber: this.bull.tagNumber,
      breed: this.bull.breed,
      name: this.bull.name,
    });
  }

  private saveBull(): void {
    this.sireAdded.emit(true);
    this.isNewBull = true;
    this.form?.get(this.sireControlName).setValue(this.tag.value);
    const bull: IBull = {
      ...this.bullForm.getRawValue(),
      breed: this.breedCode,
    };
    if (this.persistData) {
      this.handleModalClose();
      this.store.dispatch(new AddBull({ bull }));
    } else {
      this.store.dispatch(new LoadBull({ bull }));
    }
    this.close();
  }

  private get breedCode(): string {
    return this.breedService.getBreedCode(this.breed.value);
  }

  ngOnDestroy(): void {
    this.longLifeSubs.unsubscribe();
  }
}
