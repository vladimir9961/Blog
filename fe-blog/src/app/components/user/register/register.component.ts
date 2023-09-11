import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/shared/models/userData';
import { Router } from '@angular/router';
import { register } from 'src/app/components/user/state/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private store: Store, private router: Router) {}

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
      this.store.dispatch(register({ userData }));

      this.router.navigate(['/login']);
      this.emailForm.reset();
    }
  }
}
