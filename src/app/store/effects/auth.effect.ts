import {
  signUp,
  signUpSuccess,
  signUpError,
  signIn,
  signInError,
  signInSuccess,
  authenticated,
  notAuthenticated,
  checkLogin,
  logout,
  authError,
} from '../actions/auth.action';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { go } from '../actions/router.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IStore } from '../reducers';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private asf: AngularFirestore,
    private snackBar: MatSnackBar,
    private store: Store<IStore>,
  ) {}
  // @Effect()
  // public checkLogin: Observable<any> = this.actions.pipe(
  //   ofType(checkLogin),
  //   switchMap(payload =>
  //     this.afAuth.authState.pipe(
  //       switchMap(authData =>
  //         from(
  //           this.asf
  //             .collection('organization', ref =>
  //               ref.where('uid', '==', authData.uid),
  //             )
  //             .snapshotChanges(),
  //         ).pipe(
  //           mergeMap(organization => {
  //             if (authData) {
  //               return [
  //                 authenticated({
  //                   uid: authData.uid,
  //                   email: authData.email,
  //                   organizationId: organization[0].payload.doc.id,
  //                   ...(organization[0].payload.doc.data() as any),
  //                 }),
  //               ];
  //             }
  //             return [notAuthenticated()];
  //           }),
  //           catchError(err => of(authError())),
  //         ),
  //       ),
  //     ),
  //   ),
  // );

  @Effect()
  public logout: Observable<Action> = this.actions.pipe(
    ofType(logout),

    map(action => action.payload),
    switchMap(payload => {
      return of(this.afAuth.signOut());
    }),
    mergeMap(authData => {
      return [notAuthenticated(), go({ path: ['sign-in'] })];
    }),
    catchError(err => of(authError({ error: err.message }))),
  );

  @Effect()
  public signUp: Observable<any> = this.actions.pipe(
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
          console.log(authData.user);

          this.asf.collection('users').add({
            uid: authData.user.uid,
            email: authData.user.email,
            // name: payload.organization,
            // count: 0,
          });
          return [signUpSuccess(), go({ path: [''] })];
        }),
      ),
    ),
    catchError(err => of(signUpError(err))),
  );
  @Effect()
  public signIn: Observable<any> = this.actions.pipe(
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
              return [signInSuccess(user), go({ path: [''] })];
            }),
            catchError(err => {
              this.snackBar.open('Sign in error', '', {
                duration: 1500,
                panelClass: ['snackbar-color'],
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
      this.snackBar.open('Sign in error', '', {
        duration: 1500,
        panelClass: ['snackbar-color'],
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return of(signInError(err));
    }),
  );
  // @Effect({ dispatch: false })
  // public updateUser: Observable<void> = this.actions.pipe(
  //   ofType(updateUser),
  //   withLatestFrom(this.store.select('auth')),
  //   switchMap(([payload, auth]) => {
  //     return this.asf
  //       .collection('organization')
  //       .doc(auth.organizationId)
  //       .update(payload);
  //   }),
  // );
}
