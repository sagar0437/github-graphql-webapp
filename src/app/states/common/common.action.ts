import { createAction, props } from '@ngrx/store';

export const getSampleData = createAction('Get data');
export const getSampleDataSuccess = createAction(
  'Get data Success',
  props<{ details: any }>()
);
export const getSampleDataFailure = createAction(
  'Get data Failure',
  props<{ errorMessage: string }>()
);
