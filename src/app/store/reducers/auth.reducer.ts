import {
  signUp,
  signUpError,
  signIn,
  signInSuccess,
  signInError,
  authenticated,
  notAuthenticated,
  logout,
  authError
} from './../actions/auth.action';
import { createReducer, on } from '@ngrx/store';
export interface IAuth {
  uid: string;
  email: string;
  
}
export const authReducer = createReducer(
  {},
  on(signUp, (state: IAuth) => ({
    ...state,
    loading: true,
  })),
  on(signUpError, (state: IAuth, payload: any) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(signIn, (state: IAuth) => ({
    ...state,
    loading: true,
  })),
  on(signInSuccess, (state: IAuth, payload: any) => ({
    ...state,
    loading: false,
    ...payload,
  })),
  on(signInError, (state: IAuth, payload: any) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(authenticated, (state: IAuth, payload: any) => ({
    ...state,
    ...payload,
    loading: false,
  })),
  on(notAuthenticated, (state: IAuth) => ({
    ...state,
    loading: false,
  })),
  on(logout, (state: IAuth) => ({
    ...state,
    loading: true,
  })),
  on(authError, (state: IAuth, payload: any) => ({
    ...state,
    ...payload,
    loading: false,
  })),
  // on(updateUser, (state: IAuth) => ({
  //   ...state,
  //   loading: false,
  // })),
  // on(updateUserSuccess, (state: IAuth, payload: any) => ({
  //   ...state,
  //   ...payload,
  //   loading: false,
  // })),
  // on(updateUserError, (state: IAuth, payload: any) => ({
  //   ...state,
  //   error: payload,
  //   loading: false,
  // })),
);
