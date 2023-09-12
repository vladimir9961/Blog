import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import * as BlogActions from '../state/blogs/blogs.actions';
import { AppState } from 'src/app/store/app.state';

@Injectable()
export class BlogResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}

  resolve(): void {
    const blogsFromLocalStorage = localStorage.getItem('blogs');

    if (blogsFromLocalStorage) {
      const blogs = JSON.parse(blogsFromLocalStorage);
      this.store.dispatch(BlogActions.loadBlogsSuccess({ blogs }));
    } else {
      this.store.dispatch(BlogActions.loadBlogs());
    }
  }
}
