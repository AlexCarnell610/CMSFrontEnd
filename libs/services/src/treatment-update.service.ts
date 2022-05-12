import { Injectable } from '@angular/core';
import { Treatment } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { AddTreatment } from '@cms-ngrx/treatment';
import { HttpService } from '@cms-services/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TreatmentUpdateService {
  constructor(
    private readonly httpService: HttpService,
    private readonly store: Store<RootState>
  ) {}

  public addTreatment(treatment: Treatment): Promise<boolean> {
    return new Promise((resolve) => {
      this.httpService.addTreatment(treatment).subscribe((res) => {
        this.store.dispatch(new AddTreatment({ treatment: res }));
        resolve(true);
      });
    });
  }
}
