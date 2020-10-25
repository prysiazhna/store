import { createAction, props } from '@ngrx/store';
import { IAuth } from '../reducers/auth.reducer';


export const signUp = createAction('[Auth] Sign Up', (payload: any) => ({
  payload,
}));

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  (payload?: any) => payload,
);

export const signUpError = createAction(
  '[Auth] Sign Up Error',
  (payload: any) => ({ payload }),
);

export const signIn = createAction('[Auth] Sign In', (payload: any) => ({
  payload,
}));

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ auth: IAuth }>(),
);

export const signInError = createAction(
  '[Auth] Sign In Error',
  (payload?: any) => payload,
);

export const authenticated = createAction(
  '[Auth] Authenticated',
  props<{ auth: IAuth }>(),
);

export const notAuthenticated = createAction(
  '[Auth] Not Authenticated',
  (payload?: any) => ({ payload }),
);

export const logout = createAction('[Auth] Logout', (payload?: any) => ({
  payload,
}));

export const authError = createAction('[Auth] Error', (payload?: any) => ({
  payload,
}));

export const updateUser = createAction(
  '[User] Update',
  props<{ role: string; uid: string; }>(),
);
export const updateUserSuccess = createAction(
  '[User] Update success',
);
export const updateUserError = createAction(
  '[User] Update error',
  (payload?: any) => ({
    payload,
  }),
);
