import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as RegistrationActions from '../../../shared/store/registration/registration.actions'; // Replace 'path-to-registration.actions' with the actual path to your registration actions file.
import { UserData } from 'src/app/shared/models/userData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private store: Store) {}

  emailForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  OnInit() {}

  onSubmit() {
    if (this.emailForm.valid) {
      const userData: UserData = {
        username: this.emailForm.value.username as string,
        email: this.emailForm.value.email as string,
        password: this.emailForm.value.password as string,
      };

      this.store.dispatch(RegistrationActions.register({ userData }));

      this.emailForm.reset();
    }
  }
}
