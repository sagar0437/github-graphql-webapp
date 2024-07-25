import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonState } from './common.reducer';
export const selectAuthFeature = createFeatureSelector<CommonState>('common');
export const selectUser = createSelector(
  selectAuthFeature,
  (state: CommonState) => state.details
);
