import { Bull } from '@cms-interfaces';
import { createSelector } from '@ngrx/store';
import { selectAll } from './bull.reducer';

export const selectBulls = createSelector(selectAll, (bulls: Bull[]) => {
  return bulls;
});

export const selectBullByTag = createSelector(
  selectAll,
  (bulls: Bull[], props: {tagNumber: string}) =>
    bulls.find((bull) => bull.tagNumber == props.tagNumber)
);
