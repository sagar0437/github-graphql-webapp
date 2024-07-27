import { Injectable, inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import * as CommonActions from './common.action';
import { CommonService } from '../../common/services/common.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class CommonEffect {
  private api = inject(CommonService);
  action$ = inject(Actions);

  loadUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(CommonActions.getGithubRepos),
      switchMap((payload) =>
        this.api.getRepos(payload.gitHubUser).pipe(
          map((res: any) => {
            return CommonActions.getGithubReposSuccess({
              repos: res.data.user.repositories.nodes,
            });
          }),
          catchError((error: any) =>
            of(
              CommonActions.getGithubReposFailure({
                errorMessage: error?.error?.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
