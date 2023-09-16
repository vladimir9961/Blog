import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
import * as BlogActions from './blogs.actions';
import { BlogsService } from 'src/app/shared/service/blogs/blogs.service';
import { Blog } from 'src/app/shared/models/blog.model'; // Import your Blog type

@Injectable()
export class BlogEffects {
  constructor(private actions$: Actions, private blogService: BlogsService) {}

  formatRelativeTime(timestamp: string): string {
    try {
      const createdAt = moment(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
      if (createdAt.isValid()) {
        return createdAt.fromNow();
      } else {
        return 'Invalid timestamp';
      }
    } catch (error) {
      console.error(error);
      return 'Error parsing timestamp';
    }
  }

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      mergeMap(() =>
        this.blogService.getBlogs().pipe(
          map((blogs: Blog[]) => {
            const blogsWithFormattedTime = blogs.map((blog) => ({
              ...blog,
              created_at: this.formatRelativeTime(blog.created_at),
            }));

            localStorage.setItem(
              'blogs',
              JSON.stringify(blogsWithFormattedTime)
            );

            return BlogActions.loadBlogsSuccess({
              blogs: blogsWithFormattedTime,
            });
          }),
          catchError((error) =>
            of(BlogActions.loadBlogsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
