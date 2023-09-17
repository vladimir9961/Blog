import { NgModule } from '@angular/core';
import { loginStateModule } from './user/state/login.module';
import { blogStateModule } from './blog-component/state/blogs/blogs.module';
import { AddBlogStateModule } from './blog-component/state/add-blog/AddBlogState.module';
import { editBlogModule } from './blog-component/state/edit-blog/editBlogModule.module';
import { MapComponent } from './map/map.component';
import { BlogModalComponent } from './blog-component/blog-modal/blog-modal.component';

@NgModule({
  imports: [
    blogStateModule,
    AddBlogStateModule,
    loginStateModule,
    editBlogModule,
    BlogModalComponent,
  ],
  exports: [
    blogStateModule,
    AddBlogStateModule,
    loginStateModule,
    editBlogModule,
  ],
  declarations: [MapComponent],
})
export class MainStateModule {}
