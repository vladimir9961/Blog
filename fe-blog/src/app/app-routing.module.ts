import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home.component';
import { AddBlogComponent } from './components/blog-component/add-blog/add-blog.component';
import { EditBlogComponent } from './components/blog-component/edit-blog/edit-blog.component';
import { AuthGuard } from './guards/auth/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-post', component: AddBlogComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: EditBlogComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
