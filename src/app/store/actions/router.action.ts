import { createAction } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction('[Router] Go', (payload: IRouterPayload) => ({
  payload,
}));
export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');
export interface IRouterPayload {
  // tslint:disable-next-line: no-any
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
