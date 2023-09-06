import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor() {}

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
    if (this.emailForm?.valid) {
      console.log(
        this.emailForm.value.username,
        this.emailForm.value.email,
        this.emailForm.value.password
      );

      this.emailForm.reset();
    }
  }
}
