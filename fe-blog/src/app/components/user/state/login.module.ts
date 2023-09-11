import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './user.reducer';
import { LogginEffects } from './user.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', loginReducer),
    EffectsModule.forFeature([LogginEffects]),
  ],
  declarations: [],
})
export class loginStateModule {}
