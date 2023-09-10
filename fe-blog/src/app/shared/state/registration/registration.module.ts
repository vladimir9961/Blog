import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { registrationReducer } from './registration.reducer';
import { RegistrationEffects } from './registration.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('register', registrationReducer),
    EffectsModule.forFeature([RegistrationEffects]),
  ],
  declarations: [],
})
export class registrationStateModule {}
