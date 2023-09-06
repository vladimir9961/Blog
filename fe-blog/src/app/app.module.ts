import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './components/user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationEffects } from './shared/store/registration/registration.effects';
import { registrationReducer } from './shared/store/registration/registration.reducer';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ app: registrationReducer }),
    EffectsModule.forRoot([RegistrationEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
