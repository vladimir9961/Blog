import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './components/user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home.component';
import { BlogsComponent } from './components/blog-component/blogs/blogs.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddBlogComponent } from './components/blog-component/add-blog/add-blog.component';
import { StoreModule } from '@ngrx/store';
import { MainStateModule } from './components/MainState.module';
import { EffectsModule } from '@ngrx/effects';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { EditBlogComponent } from './components/blog-component/edit-blog/edit-blog.component';
import { AuthTokenInterceptor } from './shared/service/AuthToken.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BlogModalComponent } from './components/blog-component/blog-modal/blog-modal.component';
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
    CommonModule,
    BlogModalComponent,
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    MainStateModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
