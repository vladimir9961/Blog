import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { blogReducer } from './blogs.reducer';
import { BlogEffects } from './blogs.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('blogs', blogReducer),
    EffectsModule.forFeature([BlogEffects]),
  ],
  declarations: [],
})
export class blogStateModule {}
