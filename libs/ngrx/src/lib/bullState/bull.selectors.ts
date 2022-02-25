import { Bull } from '@cms-interfaces';
import { createSelector } from '@ngrx/store';
import { selectAll } from './bull.reducer';

export const selectBulls = createSelector(selectAll, (bulls: Bull[]) => {
  return bulls.filter((bull) => bull.tagNumber !== 'null');
});

export const selectBullByTag = (tagNumber) =>
  createSelector(selectAll, (bulls: Bull[]) =>
    bulls.find((bull) => bull.tagNumber == tagNumber)
  );
