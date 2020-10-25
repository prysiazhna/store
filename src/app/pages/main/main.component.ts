import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { IStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor( private store: Store<IStore>) { }

  ngOnInit(): void {
  }
  public logout() {
    this.store.dispatch(logout());
  }
 
}
