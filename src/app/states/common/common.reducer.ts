import { createReducer, on } from '@ngrx/store';
import * as CommonActions from './common.action';
import { IData } from '../../common/models/common.model';

export interface CommonState {
  details: IData | undefined;
  error: string | null;
}

export const initialCommonState: CommonState = {
  details: undefined,
  error: null,
};

export const CommonReducer = createReducer(
  initialCommonState,
  on(CommonActions.getSampleDataSuccess, (state, { details }) => ({
    ...state,
    details,
    error: null,
  }))
);
