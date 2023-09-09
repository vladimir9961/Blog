import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './components/user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationEffects } from './shared/state/registration/registration.effects';
import { registrationReducer } from './shared/state/registration/registration.reducer';
import { loginReducer } from './shared/state/login/login.reducer';
import { LogginEffects } from './shared/state/login/login.effects';
import { HomeComponent } from './components/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { blogReducer } from './shared/state/blogs/blogs.reducer';
import { BlogEffects } from './shared/state/blogs/blogs.effects';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { AddBlogEffects } from './shared/state/add-blog/addBlog.effects';
import { newBlogReducer } from './shared/state/add-blog/addBlog.reducer';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogsComponent,
    NavbarComponent,
    AddBlogComponent,
    AddBlogComponent,
    EditBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      register: registrationReducer,
      login: loginReducer,
      blogs: blogReducer,
      newBlog: newBlogReducer,
    }),
    EffectsModule.forRoot([
      RegistrationEffects,
      LogginEffects,
      BlogEffects,
      AddBlogEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
