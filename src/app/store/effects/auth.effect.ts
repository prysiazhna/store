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
  updateUser,
  updateUserError,
  updateUserSuccess,
} from '../actions/auth.action';

import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  mergeMap,
  withLatestFrom,
  tap,
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
  // public checkLogin$: Observable<any> = this.actions.pipe(
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
  public logout$: Observable<Action> = this.actions.pipe(
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
        panelClass: ['snackbar-color'],
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
              // let dataList: { id: any; data: any }[];
              // const dataCollection = firebase.firestore().collection('users');
              // dataCollection.get(query => {
              //   query.forEach(doc => {
              //     dataList.push({ id: doc.id, data: doc.data() });
              //   });
              // });
              // console.log(dat);
              return [
                signInSuccess(user),
                go({
                  path: [payload.role === 'customer' ? 'main' : 'admin-panel'],
                }),
              ];
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
