import { createAction, props } from '@ngrx/store';
import { IProduct } from '../reducers/product.reducer';

export const getProductsPending = createAction('[Products] get pending');
export const getProductsSuccess = createAction(
  '[Products] Get success',
  props<{ products: IProduct[] }>(),
);
export const getProductsError = createAction('[Products] get pending');

export const updateProductPending = createAction(
  '[Product] Update  product pending',
  props<{ product: IProduct }>(),
);
export const updateProductSuccess = createAction(
  '[Product] Update product success',
);
export const updateProductError = createAction(
  '[Product] Update product error',
);
