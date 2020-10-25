import { createReducer, on } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  updateProductPending,
  updateProductSuccess,
} from '../actions/product.action';

export interface IProductState {
  items: IProduct[];
  loading: boolean;
}
export interface IProduct {
  id: string;
  name: string;
  price: number;
  userId: string;
  status: boolean;
  date: Date | string;
}

export const productReducer = createReducer(
  {
    items: [],
    loading: false,
  },
  on(getProductsPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductsSuccess, (state: IProductState, { products }) => ({
    ...state,
    items: products,
    loading: false,
  })),

  on(updateProductPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(updateProductSuccess, (state: IProductState) => ({
    ...state,
    loading: false,
  })),
);
export function reducerProduct(state: IProductState | undefined, action: any) {
  return productReducer(state, action);
}
