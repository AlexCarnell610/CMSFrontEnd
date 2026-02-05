import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AssistanceReason, CalvingAssistance, Modals } from '@cms-enums';
import { CalvingStat } from '@cms-interfaces';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';

enum FormControls {
  IsAlive = 'isAlive',
  EaseOfCalving = 'easeOfCalving',
  ReasonBigCalf = 'reasonBigCalf',
  ReasonPoorPres = 'reasonPoorPres',
  GettingUp = 'gettingUp',
  DrinkAssistance = 'drinkAssistance',
  DamHealth = 'damHealth',
  Notes = 'calvingNotes',
}

@Component({
    selector: 'cms-calving-stats-modal',
    templateUrl: './calving-stats-modal.component.html',
    styleUrls: ['./calving-stats-modal.component.scss'],
    standalone: false
})
export class CalvingStatsModalComponent implements OnInit, AfterViewInit {
  @Output() statSaved: EventEmitter<CalvingStat | false> = new EventEmitter();
  @Input() stat: CalvingStat;
  public calvingStatForm: UntypedFormGroup;
  private subs: Subscription = new Subscription();
  private notesChanged: boolean = false;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly modals: NgxSmartModalService
  ) {}

  ngOnInit(): void {
    this.setUpForm();
    this.trackEaseOfCalving();
    this.trackIsAlive();
    this.trackNotesChange();
  }

  ngAfterViewInit() {
    this.modals
      .get(Modals.CalvingStats)
      .onAnyCloseEventFinished.subscribe(() => {
        this.resetForm();
      });

    this.modals.get(Modals.CalvingStats).onOpenFinished.subscribe(() => {
      if (this.stat) {
        this.setFormValues();
      }
    });
  }

  public get isDirty():boolean{
    return this.calvingStatForm.dirty
  }

  public save() {
    this.markAllAsDirty();
    if (this.calvingStatForm.valid) {
      const stat: CalvingStat = {
        alive: this.alive,
        assistance: this.convertAssistance(),
        assistanceReason: this.convertReason(),
        damHealth: this.damHealth.value,
        drinkAssist: this.alive ? this.convertDrinkAssist() : null,
        gettingUp: this.alive ? this.gettingUp.value : null,
        calvingNotes: this.notesChanged ? this.notes.value : null,
      };

      this.statSaved.emit(stat);
      this.modals.get(Modals.CalvingStats).close();
    }
  }

  public close() {
    this.statSaved.emit(false);
    this.modals.get(Modals.CalvingStats).close();
  }

  public getCSSForDrinkAssistYes() {
    if (this.drinkAssistance.invalid && this.drinkAssistance.dirty) {
      return 'btn-outline-danger';
    } else if (this.drinkAssistance.disabled) {
      return 'disabled';
    } else if (
      this.drinkAssistance.dirty &&
      this.drinkAssistance.value === 'yes'
    ) {
      return 'active';
    }
  }

  public getCSSForDrinkAssistNo() {
    if (this.drinkAssistance.invalid && this.drinkAssistance.dirty) {
      return ['btn-outline-danger', 'invalid-label'];
    } else if (this.drinkAssistance.disabled) {
      return 'disabled';
    } else if (
      this.drinkAssistance.dirty &&
      this.drinkAssistance.value === 'no'
    ) {
      return 'active';
    }
  }

  public getCSSForCalvingEase() {
    if (this.calvingEase.invalid && this.calvingEase.dirty) {
      return 'is-invalid';
    } else if (this.calvingEase.valid && this.calvingEase.dirty) {
      return 'is-valid';
    }
  }

  private trackNotesChange() {
    this.notes.valueChanges.subscribe((val) => {
      this.notesChanged = val !== '';
    });
  }

  private setFormValues() {
    this.isAlive.setValue(this.stat.alive ? 'alive' : 'dead');
    this.calvingEase.setValue(this.stat.assistance);
    this.reasonBigCalf.setValue(
      this.convertReasonStatToForm(AssistanceReason.BigCalf)
    );
    this.reasonPoorPres.setValue(
      this.convertReasonStatToForm(AssistanceReason.PoorPresentation)
    );
    this.gettingUp.setValue(this.stat.gettingUp);
    this.drinkAssistance.setValue(this.getDrinkAssistanceVal());
    this.damHealth.setValue(this.stat.damHealth);
    this.notes.setValue(this.stat.calvingNotes);

    if (this.stat.alive) {
      this.drinkAssistance.markAsDirty();
      this.isAlive.markAsDirty();
    } else {
      this.isAlive.markAsDirty();
    }
  }

  private getDrinkAssistanceVal() {
    return this.stat.drinkAssist
      ? 'yes'
      : this.stat.drinkAssist === null
      ? ''
      : 'no';
  }

  private convertReasonStatToForm(findReason: AssistanceReason) {
    return (
      this.stat.assistanceReason.findIndex(
        (reason) => reason === findReason
      ) !== -1
    );
  }

  private convertDrinkAssist() {
    return this.drinkAssistance.value === 'yes';
  }

  private convertAssistance(): CalvingAssistance {
    switch (this.calvingEase.value) {
      case 'assistanceNone':
        return CalvingAssistance.None;
      case 'assistance':
        return CalvingAssistance.Required;
      case 'vet':
        return CalvingAssistance.Vet;
    }
  }

  private convertReason():
    | [AssistanceReason]
    | [AssistanceReason, AssistanceReason] {
    if (this.reasonBigCalf.value) {
      if (this.reasonPoorPres.value) {
        return [AssistanceReason.BigCalf, AssistanceReason.PoorPresentation];
      } else {
        return [AssistanceReason.BigCalf];
      }
    } else {
      if (this.reasonPoorPres.value) {
        return [AssistanceReason.PoorPresentation];
      } else {
        return [AssistanceReason.NA];
      }
    }
  }

  private trackIsAlive() {
    this.subs.add(
      this.isAlive.valueChanges.subscribe((val) => {        
        if (this.alive) {
          this.gettingUp.enable();
          this.drinkAssistance.enable();
        } else {
          this.gettingUp.disable();
          this.drinkAssistance.disable();
          this.gettingUp.setValue(5);
        }
      })
    );
  }

  private get alive() {
    return this.isAlive.value === 'alive';
  }

  private setUpForm() {
    this.calvingStatForm = this.fb.group({
      easeOfCalving: this.fb.control([], Validators.required),
      reasonBigCalf: this.fb.control([]),
      reasonPoorPres: this.fb.control([]),
      isAlive: this.fb.control([], Validators.required),
      gettingUp: this.fb.control(5, Validators.required),
      drinkAssistance: this.fb.control([], Validators.required),
      damHealth: this.fb.control(5, Validators.required),
      calvingNotes: this.fb.control([]),
    });
    this.disableAssistReason();
    this.resetAssistReason();
  }

  private disableAssistReason() {
    this.reasonBigCalf.disable();
    this.reasonPoorPres.disable();
  }

  private enableAssistReason() {
    this.reasonBigCalf.enable();
    this.reasonPoorPres.enable();
  }

  private resetAssistReason() {
    this.reasonBigCalf.setValue(false);
    this.reasonPoorPres.setValue(false);
  }

  private trackEaseOfCalving() {
    this.calvingEase.valueChanges.subscribe((val) => {
      if (val === CalvingAssistance.Required || val === CalvingAssistance.Vet) {
        this.enableAssistReason();
      } else {
        this.disableAssistReason();
        this.resetAssistReason();
      }
    });
  }

  private markAllAsDirty() {
    this.isAlive.markAsDirty();
    this.calvingEase.markAsDirty();
    this.gettingUp.markAsDirty();
    this.drinkAssistance.markAsDirty();
    this.damHealth.markAsDirty();
    this.reasonBigCalf.markAsDirty();
    this.reasonPoorPres.markAsDirty();
  }

  private resetForm() {
    this.calvingStatForm.reset({ gettingUp: 5, damHealth: 5 });
  }

  public get isAlive() {
    return this.calvingStatForm.get(FormControls.IsAlive);
  }

  public get calvingEase() {
    return this.calvingStatForm.get(FormControls.EaseOfCalving);
  }

  public get reasonPoorPres() {
    return this.calvingStatForm.get(FormControls.ReasonPoorPres);
  }

  public get reasonBigCalf() {
    return this.calvingStatForm.get(FormControls.ReasonBigCalf);
  }

  public get gettingUp() {
    return this.calvingStatForm.get(FormControls.GettingUp);
  }

  public get drinkAssistance() {
    return this.calvingStatForm.get(FormControls.DrinkAssistance);
  }

  public get damHealth() {
    return this.calvingStatForm.get(FormControls.DamHealth);
  }

  public get notes() {
    return this.calvingStatForm.get(FormControls.Notes);
  }
}
