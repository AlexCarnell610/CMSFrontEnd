import {
  ActionReducerMap,


  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { animalReducer, AnimalState } from './src/animals.reducer';
  
  export interface RootState {
    animal: AnimalState
  }

  // export const initialState: RootState = {
  //   animal: initialAnim
  // };
  
  export const reducers: ActionReducerMap<RootState, any> = {
    animal: animalReducer
  };
  
  
  export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];  



export * from './src/animals.reducer';
export * from './src/reducers.module';

