import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { animalReducer, AnimalState } from './animalState';
import { bullReducer, BullState } from './bullState';

export interface RootState {
  animal: AnimalState;
  bull: BullState;
}

// export const initialState: RootState = {
//   animal: initialAnim
// };

export const reducers: ActionReducerMap<RootState, any> = {
  animal: animalReducer,
  bull: bullReducer,
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? []
  : [];
