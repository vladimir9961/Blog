import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationEffects } from 'src/app/shared/store/registration/registration.effects';
import { registrationReducer } from 'src/app/shared/store/registration/registration.reducer';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ app: registrationReducer }),
    EffectsModule.forRoot([RegistrationEffects]),
    HttpClientModule,
  ],
  exports: [RegisterComponent, LoginComponent],
})
export class UserModule {}
