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
      ofType(CommonActions.getSampleData),
      switchMap(() =>
        this.api.getSampleData().pipe(
          map((res) => {
            console.log('res', res);

            return CommonActions.getSampleDataSuccess({
              details: res,
            });
          }),
          catchError((error: any) =>
            of(
              CommonActions.getSampleDataFailure({
                errorMessage: error?.error?.message,
              })
            )
          )
        )
      )
    )
  );
}
