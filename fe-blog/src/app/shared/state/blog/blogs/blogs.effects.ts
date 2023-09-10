import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as BlogActions from './blogs.actions';
import { BlogsService } from '../../../service/blogs/blogs.service';

@Injectable()
export class BlogEffects {
  constructor(private actions$: Actions, private blogService: BlogsService) {}

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      mergeMap(() =>
        this.blogService.getBlogs().pipe(
          map((blogs) => {
            console.log(blogs);
            return BlogActions.loadBlogsSuccess({ blogs });
          }),
          catchError((error) =>
            of(BlogActions.loadBlogsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
