import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './components/user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home.component';
import { BlogsComponent } from './components/blog-component/blogs/blogs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddBlogComponent } from './components/blog-component/add-blog/add-blog.component';
import { StoreModule } from '@ngrx/store';
import { MainStateModule } from './shared/state/MainState.module';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { EditBlogComponent } from './components/blog-component/edit-blog/edit-blog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogsComponent,
    NavbarComponent,
    AddBlogComponent,
    EditBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    MainStateModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
