import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './login.reducer';
import { LogginEffects } from './login.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('login', loginReducer),
    EffectsModule.forFeature([LogginEffects]),
  ],
  declarations: [],
})
export class loginStateModule {}
