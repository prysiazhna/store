import { IProduct } from './../../store/reducers/product.reducer';
import { getProductsPending } from './../../store/actions/product.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { IStore } from 'src/app/store/reducers';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  public products: IProduct[];
  public userId: string;
  constructor(private store: Store<IStore>, private afAuth: AngularFireAuth) {}

  public ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => (this.userId = user.uid));
    this.store.dispatch(getProductsPending());
    this.store.select('product').subscribe(products => {
      this.products = products.items.filter(p => p.status === true);
    });
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
