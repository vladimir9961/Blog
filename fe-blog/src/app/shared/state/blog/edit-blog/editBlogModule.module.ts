import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { blogReducer } from './editBlog.reducers';
import { BlogEffects, GetPostEffect } from './editBlog.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('getBlog', blogReducer),
    EffectsModule.forFeature([BlogEffects, GetPostEffect]),
  ],
  declarations: [],
})
export class editBlogModule {}
