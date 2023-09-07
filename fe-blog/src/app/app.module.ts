import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './components/user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationEffects } from './shared/state/registration/registration.effects';
import { registrationReducer } from './shared/state/registration/registration.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { loginReducer } from './shared/state/login/login.reducer';
import { LogginEffects } from './shared/state/login/login.effects';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ chat: registrationReducer, loggin: loginReducer }),
    EffectsModule.forRoot([RegistrationEffects, LogginEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
