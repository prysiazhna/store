import { createAction } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction('[Router] Go', (payload: IRouterPayload) => ({
  payload,
}));
export interface IRouterPayload {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
