import { IMedication, ITreatment } from '@cms-interfaces';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { animalReducer, AnimalState } from './animalState';
import { bullReducer, BullState } from './bullState';
import { MedicationState, medicationReducer } from './medicationState';
import { TreatmentState, treatmentReducer } from './treatmentState';

export interface RootState {
  animal: AnimalState;
  bull: BullState;
  medication: MedicationState;
  treatment: TreatmentState
}

export const reducers: ActionReducerMap<RootState, any> = {
  animal: animalReducer,
  bull: bullReducer,
  medication: medicationReducer,
  treatment: treatmentReducer
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? []
  : [];

  export function sortByCreatedDate(a: ITreatment|IMedication, b: ITreatment|IMedication): number {
    return a.createdAt.isAfter(b.createdAt) ? -1 : b.createdAt.isAfter(a.createdAt) ? 1 : 0
  }
