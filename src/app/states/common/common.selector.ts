import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonState } from './common.reducer';
export const selectCommonFeature = createFeatureSelector<CommonState>('common');
export const selectReposList = createSelector(
  selectCommonFeature,
  (state: CommonState) => state.repos,
);
