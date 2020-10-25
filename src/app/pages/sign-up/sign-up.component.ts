import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AbstractForm } from 'src/app/shared/form-helper';
import { signUp } from 'src/app/store/actions/auth.action';
import { IStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends AbstractForm implements OnInit {
  public constructor(private fb: FormBuilder, private store: Store<IStore>) {
    super();
  }
  public signupForm: FormGroup;
  public ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public signup(): void {
    this.store.dispatch(
      signUp({
        email: this.getField('email').value,
        password: this.getField('password').value,
      }),
    );
  }
}
