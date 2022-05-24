import { Component, OnInit } from '@angular/core';
import { PageURLs } from '@cms-enums';
import { Treatment } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectAll } from '@cms-ngrx/treatment';
import { ScreenSizeService } from '@cms-services';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TreatmentDisplay {
  group: any[];
  medicationName: string[];
  dose: string[];
  date: string[]
}

@Component({
  selector: 'cms-view-treatments',
  templateUrl: './view-treatments.component.html',
  styleUrls: ['./view-treatments.component.scss'],
})
export class ViewTreatmentsComponent implements OnInit {
  constructor(private readonly store: Store<RootState>, private readonly screensizeService: ScreenSizeService) {}

  public actualTreatments$: Observable<Treatment[]>
  public backPath = [PageURLs.MainMenu, PageURLs.Treatment];
  public backText = 'Treatments';
  public treatments$: Observable<TreatmentDisplay>;

  ngOnInit(): void {
    this.actualTreatments$ = this.store.select(selectAll)
    this.treatments$ = this.store.select(selectAll).pipe(
      map((treatments) => {
        let display: TreatmentDisplay = {
          dose: [],
          group: [],
          medicationName: [],
          date: []
        };
        treatments.forEach((treatment) => {
          display.dose.push(treatment.dose + " ml");
          display.group.push(
            treatment.treatmentTagNos ?? treatment.treatmentGroup
          );
          display.medicationName.push(treatment.medication.name);
          display.date.push(treatment.date.format('DD/MM/yyyy'))
        });
        return display;
      })
    );
  }

  get isSmallScreen(): boolean{
    return this.screensizeService.isSmallScreen
  }

  public hello() {
    console.warn('HELLO');
  }
}
