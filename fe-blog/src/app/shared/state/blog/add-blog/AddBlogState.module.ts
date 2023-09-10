import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddBlogEffects } from './addBlog.effects';
import { newBlogReducer } from './addBlog.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('newBlog', newBlogReducer),
    EffectsModule.forFeature([AddBlogEffects]),
  ],
  declarations: [],
})
export class AddBlogStateModule {}
