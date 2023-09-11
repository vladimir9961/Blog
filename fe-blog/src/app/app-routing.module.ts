import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { AddBlogComponent } from './components/blog-component/add-blog/add-blog.component';
import { EditBlogComponent } from './components/blog-component/edit-blog/edit-blog.component';
import { AuthGuard } from './guards/auth/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'new-post', component: AddBlogComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: EditBlogComponent },
  {
    path: '',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
