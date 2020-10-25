import { updateUser } from './../../store/actions/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { IStore } from 'src/app/store/reducers';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
})
export class SelectRoleComponent implements OnInit {
  public userId: string;
  constructor(private store: Store<IStore>, private afAuth: AngularFireAuth) {}

  public ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => (this.userId = user.uid));
  }
  public logout(): void {
    this.store.dispatch(logout());
  }

  public selectRole(role: string): void {
    this.store.dispatch(updateUser({ role, uid: this.userId }));
  }
}
