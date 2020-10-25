import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer, IAuth } from './auth.reducer';
import * as fromRouter from '@ngrx/router-store';
import { IProductState, productReducer } from './product.reducer';

export interface IStore {
  auth: IAuth;
  product: IProductState;
}
export const reducers: ActionReducerMap<any> = {
  auth: authReducer,
  routerReducer: fromRouter.routerReducer,
  product: productReducer,
};
export interface IRouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}
export class CustomRouterSerializer
  implements fromRouter.RouterStateSerializer<IRouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    const {
      url,
      root: { queryParams },
    } = routerState;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params };
  }
}
