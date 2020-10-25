import { IProduct } from './../../store/reducers/product.reducer';
import { getProductsPending } from './../../store/actions/product.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { IStore } from 'src/app/store/reducers';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  public products: IProduct[];
  public userId: string;
  constructor(
    private store: Store<IStore>,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {}

  ngOnInit(): void {
    // this.afs.collection('product').doc('po7kNvJuP2ebN0yTSeENjLU7Soe3').set({
    //   id: 'po7kNvJuP2ebN0yTSeENjLU7Soe3',
    //   name: 'Lorem ipsum',
    //   price: 250,
    //   status: false,
    // });
    this.afAuth.onAuthStateChanged(user => (this.userId = user.uid));
    this.store.dispatch(getProductsPending());
    this.store.select('product').subscribe(products => {
      this.products = products.items;
    });
  }
  // public buy(product: IProduct): void {
  //   this.store.dispatch(
  //     updateProductPending({
  //       product: {
  //         name: product.name,
  //         price: product.price,
  //         userId: this.userId,
  //         id: product.id,
  //         status: product.status,
  //       },
  //     }),
  //   );
  // }
  public logout(): void {
    this.store.dispatch(logout());
  }
}
