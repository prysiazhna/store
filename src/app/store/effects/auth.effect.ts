import {
  signUp,
  signUpSuccess,
  signUpError,
  signIn,
  signInError,
  signInSuccess,
  notAuthenticated,
  logout,
  authError,
  updateUser,
  updateUserError,
} from '../actions/auth.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { go } from '../actions/router.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private asf: AngularFirestore,
    private snackBar: MatSnackBar,
  ) {}

  @Effect()
  public logout$: Observable<Action> = this.actions.pipe(
    ofType(logout),
    map(action => action.payload),
    switchMap(_ => {
      return of(this.afAuth.signOut());
    }),
    mergeMap(_ => {
      return [notAuthenticated(), go({ path: ['sign-in'] })];
    }),
    catchError(err => of(authError({ error: err.message }))),
  );

  @Effect()
  public signUp$: Observable<any> = this.actions.pipe(
    ofType(signUp),
    map(action => action.payload),
    switchMap(payload =>
      from(
        this.afAuth.createUserWithEmailAndPassword(
          payload.email,
          payload.password,
        ),
      ).pipe(
        mergeMap(authData => {
          this.asf.collection('users').doc(authData.user.uid).set({
            uid: authData.user.uid,
            email: authData.user.email,
          });
          return [signUpSuccess(), go({ path: ['select-role'] })];
        }),
      ),
    ),
    catchError(err => {
      this.snackBar.open(err, '', {
        duration: 1500,
        panelClass: ['snackbar-color-red'],
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return of(signUpError(err));
    }),
  );

  @Effect()
  public signIn$: Observable<any> = this.actions.pipe(
    ofType(signIn),
    map(action => action.payload),
    switchMap(payload =>
      from(
        this.afAuth.signInWithEmailAndPassword(payload.email, payload.password),
      ).pipe(
        switchMap(authData =>
          from(
            this.asf
              .collection('users', ref =>
                ref.where('uid', '==', authData.user.uid),
              )
              .snapshotChanges(),
          ).pipe(
            mergeMap(data => {
              const user = {
                email: authData.user.email,
                ...(data[0].payload.doc.data() as any),
                isLogged: true,
              };
              // firebase.auth().currentUser.uid  role??
              return [
                signInSuccess(user),
                go({
                  path: [payload !== 'customer' ? 'main' : 'admin-panel'],
                }),
              ];
            }),
            catchError(err => {
              this.snackBar.open('Sign in error', '', {
                duration: 1500,
                panelClass: ['snackbar-color-red'],
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
              return of(signInError(err));
            }),
          ),
        ),
      ),
    ),
    catchError(err => {
      this.snackBar.open(err, '', {
        duration: 1500,
        panelClass: ['snackbar-color'],
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return of(signInError(err));
    }),
  );

  public updateUser$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(updateUser),
      switchMap(payload =>
        from(
          this.asf
            .collection('users')
            .doc(payload.uid)
            .update({ role: payload.role }),
        ).pipe(
          map(() =>
            go({
              path: [payload.role === 'customer' ? 'main' : 'admin-panel'],
            }),
          ),
          catchError(_ => {
            return of(updateUserError());
          }),
        ),
      ),
    ),
  );
}
