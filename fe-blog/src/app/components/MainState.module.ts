import { NgModule } from '@angular/core';
import { loginStateModule } from './user/state/login.module';
import { blogStateModule } from './blog-component/state/blogs/blogs.module';
import { AddBlogStateModule } from './blog-component/state/add-blog/AddBlogState.module';
import { editBlogModule } from './blog-component/state/edit-blog/editBlogModule.module';

@NgModule({
  imports: [
    blogStateModule,
    AddBlogStateModule,
    loginStateModule,
    editBlogModule,
  ],
  exports: [
    blogStateModule,
    AddBlogStateModule,
    loginStateModule,
    editBlogModule,
  ],
})
export class MainStateModule {}
