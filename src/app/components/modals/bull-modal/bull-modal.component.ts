import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Modals } from '@cms-enums';
import { IBull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { AddBull, LoadBull, selectBulls } from '@cms-ngrx/bull';
import { AnimalBreedService, WarningService } from '@cms-services';
import { breedValidator } from '@cms-validators';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { BirthFormControls } from '../birth-modal/birth-modal.component';

@Component({
  selector: 'cms-bull-modal',
  templateUrl: './bull-modal.component.html',
  styleUrls: ['./bull-modal.component.scss'],
})
export class BullModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() bull: IBull;
  @Output() sireAdded: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('errorPop') errorPopover: NgbPopover;
  public isAdd = false;
  public bullForm = new FormGroup({});
  public isNewBull = false;

  private subs = new Subscription();
  private persistData: boolean = false;

  constructor(
    private readonly modalService: NgxSmartModalService,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<RootState>,
    private readonly warningService: WarningService,
    private readonly breedService: AnimalBreedService
  ) {}

  ngOnInit(): void {
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
            this.isSameBreedValidator(),
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
      this.isAdd = modalData.isAdd;
      this.persistData = modalData.persistData;
      this.bullForm.reset({ tagNumber: 'UK' });
      if (!this.isAdd) {
        this.setData();
      }
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
      this.subs.add(
        this.store.select(selectBulls).subscribe((bulls) => {
          const similarIndex = bulls.findIndex(
            (bull) =>
              bull.tagNumber === this.tag.value || bull.name === this.name.value
          );
          if (similarIndex > -1 && !this.isNewBull) {
            const isSameTag = bulls[similarIndex].tagNumber === this.tag.value;
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
              });
          } else {
            this.saveBull();
          }
        })
      );
    } else {
      this.errorPopover.open();
    }
  }

  public close(): void {
    this.modalService.get(Modals.Sire).close();
  }

  private setData(): void {
    this.bullForm.setValue({
      tagNumber: this.bull.tagNumber,
      breed: this.bull.breed,
      name: this.bull.name,
    });
    this.breed.disable();
  }

  private saveBull(): void {
    const breedCode = this.breedService.getBreedCode(this.breed.value);
    this.subs.unsubscribe();
    this.sireAdded.emit(true);
    this.isNewBull = true;
    this.form?.get(BirthFormControls.Sire).setValue(this.tag.value);
    const bull: IBull = {
      ...this.bullForm.getRawValue(),
      breed: breedCode,
    };
    if (this.persistData) {
      this.store.dispatch(new AddBull({ bull }));
    } else {
      this.store.dispatch(new LoadBull({ bull }));
    }
    this.close();
  }

  private isNullOrUndefined(value): boolean {
    return value === null || value === undefined;
  }

  private isSameBreedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const calfBreed = this.form?.get(BirthFormControls.Breed).value;
      
      
      if (calfBreed === '' || !calfBreed || !control.value) return null;

      return this.breedService.isSameBreed(
        calfBreed?.toString(),
        control.value?.toString()
      )
        ? null
        : { notSameBreed: calfBreed };

      // return calfBreed?.toString().toUpperCase() !==
      //   control.value?.toString().toUpperCase()
      //   ? { notSameBreed: calfBreed }
      //   : null;
    };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
