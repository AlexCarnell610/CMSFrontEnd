import { ITreatment } from '@cms-interfaces';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import {
  addTreatment,
  initialLoadTreatmentsSuccess,
  loadTreatmentSuccess,
  updateTreatmentSuccess,
} from './treatment.actions';

export const treatmentFeatureKey = 'treatment';

export interface TreatmentState extends EntityState<ITreatment> {}

export const adapter: EntityAdapter<ITreatment> =
  createEntityAdapter<ITreatment>({
    selectId: (treatment) => treatment.id,
  });

export const initialTreatmentState: TreatmentState = adapter.getInitialState(
  {}
);

export const treatmentReducer = createReducer(
  initialTreatmentState,
  on(initialLoadTreatmentsSuccess, (state, { treatments }) =>
    adapter.setAll(treatments, state)
  ),
  on(initialLoadTreatmentsSuccess, (state, { treatments }) =>
    adapter.upsertMany(treatments, state)
  ),
  on(loadTreatmentSuccess, (state, { treatments }) =>
    adapter.upsertMany(treatments, state)
  ),
  on(initialLoadTreatmentsSuccess, (state, { treatments }) =>
    adapter.setAll(treatments, state)
  ),
  on(updateTreatmentSuccess, (state, { treatment }) =>
    adapter.updateOne(treatment, state)
  )
);

const getTreatmentState =
  createFeatureSelector<TreatmentState>(treatmentFeatureKey);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(getTreatmentState);
