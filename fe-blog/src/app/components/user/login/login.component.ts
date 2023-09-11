import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as LoginActions from '../state/user.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private store: Store) {}
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email || '';
      const password = this.loginForm.value.password || '';
      this.store.dispatch(LoginActions.login({ email, password }));
      this.loginForm.reset();
    }
  }
}
