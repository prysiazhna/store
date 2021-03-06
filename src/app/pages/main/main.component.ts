import { IProduct } from './../../store/reducers/product.reducer';
import {
  getProductsPending,
  updateProductPending,
} from './../../store/actions/product.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { IStore } from 'src/app/store/reducers';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public products: IProduct[];
  public userId: string;
  public cart = [];
  constructor(private store: Store<IStore>, private afAuth: AngularFireAuth) {}

  public ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => (this.userId = user.uid));
    this.store.dispatch(getProductsPending());
    this.store.select('product').subscribe(products => {
      this.products = products.items;
    });
  }
  public buy(product: IProduct): void {
    const date = new Date();
    this.cart.push(product);
    this.store.dispatch(
      updateProductPending({
        product: {
          name: product.name,
          price: product.price,
          userId: this.userId,
          id: product.id,
          status: product.status,
          date,
        },
      }),
    );
  }
  public logout(): void {
    this.store.dispatch(logout());
  }
  public cancel(product: IProduct): void {
    this.cart = this.cart.filter(p => product.id !== p.id);
    this.store.dispatch(
      updateProductPending({
        product: {
          name: product.name,
          price: product.price,
          userId: null,
          id: product.id,
          status: true,
          date: null,
        },
      }),
    );
  }
}
