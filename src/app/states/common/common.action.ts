import { createAction, props } from '@ngrx/store';

export const getGithubRepos = createAction(
  'Get Github Repos',
  props<{ gitHubUser: string }>(),
);
export const getGithubReposSuccess = createAction(
  'Get Github Repos Success',
  props<{ repos: any }>(),
);
export const getGithubReposFailure = createAction(
  'Get Github Repos Failure',
  props<{ errorMessage: string }>(),
);
