import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userLogin } from 'src/app/shared/models/login/userLogin';
import * as LoginActions from '../../../shared/state/login/login.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
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
  constructor(private store: Store, private router: Router) {}
  onSubmit() {
    if (this.loginForm.valid) {
      const userData: userLogin = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      };
      this.router.navigate(['/home']);
      this.store.dispatch(
        LoginActions.login({
          email: userData.email,
          password: userData.password,
        })
      );

      this.loginForm.reset();
    }
  }
}
