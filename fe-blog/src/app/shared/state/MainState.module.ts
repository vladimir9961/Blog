import { NgModule } from '@angular/core';
import { blogStateModule } from './blog/blogs/blogs.module';
import { AddBlogStateModule } from './blog/add-blog/AddBlogState.module';
import { loginStateModule } from './login/login.module';
import { registrationStateModule } from './registration/registration.module';
import { editBlogModule } from './blog/edit-blog/editBlogModule.module';

@NgModule({
  imports: [
    blogStateModule,
    AddBlogStateModule,
    loginStateModule,
    registrationStateModule,
    editBlogModule,
  ],
  exports: [
    blogStateModule,
    AddBlogStateModule,
    loginStateModule,
    registrationStateModule,
    editBlogModule,
  ],
})
export class MainStateModule {}
