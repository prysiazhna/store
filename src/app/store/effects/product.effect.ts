import {
  updateProductError,
  updateProductPending,
  updateProductSuccess,
} from './../actions/product.action';
import { IProduct } from './../reducers/product.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IStore } from '../reducers';
import {
  getProductsError,
  getProductsPending,
  getProductsSuccess,
} from '../actions/product.action';

@Injectable()
export class ProductEffects {
  constructor(
    private actions: Actions,
    private snackBar: MatSnackBar,
    private asf: AngularFirestore,
    private store: Store<IStore>,
  ) {}
  public getProductsEffect$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(getProductsPending),
      withLatestFrom(this.store.select('product')),
      switchMap(_ => {
        return this.asf
          .collection('product')
          .valueChanges()
          .pipe(
            map(products => {
              return getProductsSuccess({
                products: products as IProduct[],
              });
            }),
            catchError(() => {
              return of(getProductsError());
            }),
          );
      }),
    ),
  );

  public updateProduct$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(updateProductPending),
      switchMap(payload =>
        from(
          this.asf.collection('product').doc(payload.product.id).update({
            status: !payload.product.status,
            userId: payload.product.userId,
            date: payload.product.date,
          }),
        ).pipe(
          map(() => updateProductSuccess()),
          tap(() =>
            this.snackBar.open('Success', '', {
              duration: 1500,
              panelClass: ['snackbar-color-green'],
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }),
          ),
          catchError(_ => {
            return of(updateProductError());
          }),
        ),
      ),
    ),
  );
}
