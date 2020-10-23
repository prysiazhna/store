// import { signIn } from './../../store/actions/auth.action';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { IStore } from 'src/app/store/reducers';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractForm } from 'src/app/shared/form-helper';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends AbstractForm implements OnInit {
  public constructor(private fb: FormBuilder,
    //  private store: Store<IStore>
     ) {
    super();
  }
  public form:any;
  public user$: Observable<any>;

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public signin(): void {
  //   this.store.dispatch(
  //     signIn({
  //       email: this.getField('email').value,
  //       password: this.getField('password').value,
  //     }),
  //   );
  }
}
