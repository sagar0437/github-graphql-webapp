import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CommonReducer, CommonState } from './common/common.reducer';

export interface State {
  common: CommonState;
}

export const reducers: ActionReducerMap<State> = {
  common: CommonReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
