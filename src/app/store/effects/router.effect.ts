import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { go, back, forward } from '../actions/router.action';
import { Action } from '@ngrx/store';
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

  @Effect({ dispatch: false })
  public navigateBack$: Observable<Action> = this.actions$.pipe(
    ofType(back),
    tap(() => this.location.back()),
  );

  @Effect({ dispatch: false })
  public navigateForward$: Observable<Action> = this.actions$.pipe(
    ofType(forward),
    tap(() => this.location.forward()),
  );

  public constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}
}
