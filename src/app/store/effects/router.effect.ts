import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { go } from '../actions/router.action';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IRouterPayload } from '../actions/router.action';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  public navigate$: Observable<IRouterPayload> = this.actions$.pipe(
    ofType(go),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }: IRouterPayload) => {
      this.router.navigate(path, { queryParams, ...extras });
    }),
  );

  public constructor(private actions$: Actions, private router: Router) {}
}
