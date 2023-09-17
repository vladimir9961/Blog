import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  addCommentReducer,
  blogReducer,
  dislikeReducer,
  likeReducer,
} from './blogs.reducer';
import { BlogEffects } from './blogs.effects';
import { BlogResolver } from '../../blogs/blogs.resolver';

@NgModule({
  imports: [
    StoreModule.forFeature('blogs', blogReducer),
    StoreModule.forFeature('dislakes', dislikeReducer),
    StoreModule.forFeature('like', likeReducer),
    StoreModule.forFeature('comment', addCommentReducer),
    EffectsModule.forFeature([BlogEffects]),
  ],
  declarations: [],
  providers: [BlogResolver],
})
export class blogStateModule {}
