import { createReducer, on } from '@ngrx/store';
import * as CommonActions from './common.action';
import { IRepository } from '../../common/models/common.model';

export interface CommonState {
  repos: IRepository[] | undefined;
  error: string | null;
}

export const initialCommonState: CommonState = {
  repos: undefined,
  error: null,
};

export const CommonReducer = createReducer(
  initialCommonState,
  on(CommonActions.getGithubReposSuccess, (state, { repos }) => ({
    ...state,
    repos,
    error: null,
  })),
  on(CommonActions.getGithubReposFailure, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  })),
);
