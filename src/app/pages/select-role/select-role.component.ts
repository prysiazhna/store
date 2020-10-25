import { updateUser } from './../../store/actions/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { IStore } from 'src/app/store/reducers';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
})
export class SelectRoleComponent implements OnInit {
  public userId: string;
  constructor(
    private store: Store<IStore>,
    private afAuth: AngularFireAuth,
    private asf: AngularFirestore,
  ) {}

  public ngOnInit(): void {
    // this.asf
    //   .collection('users')
    //   .get()
    //   .subscribe(x => x.docs.forEach(z => console.log(z.data())));

    this.afAuth.onAuthStateChanged(user => (this.userId = user.uid));
    // console.log(user);
    // let docId;
    // this.asf
    //   .collection('users', ref =>
    //     ref.where('uid', '==', 'GdVcmcXUyueKpJgTLOHrEQ7B1xb2'),
    //   )
    //   .snapshotChanges()
    //   .subscribe(data => {
    //     docId = data.map(e => e.payload.doc.id);
    //   });
  }
  public logout() {
    this.store.dispatch(logout());
  }

  public selectRole(role: string) {
    this.store.dispatch(updateUser({ role, uid: this.userId }));
  }
}
