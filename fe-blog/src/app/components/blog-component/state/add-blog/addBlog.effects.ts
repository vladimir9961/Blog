import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AddBlogActions from './addBlog.actions';
import { AddBlogService } from 'src/app/shared/service/blogs/add-blog.service';

@Injectable()
export class AddBlogEffects {
  constructor(
    private actions$: Actions,
    private addBlogService: AddBlogService
  ) {}

  addBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddBlogActions.addBlog),
      switchMap((action) => {
        return this.addBlogService.createBlog(action, 'awfa').pipe(
          map((response) => {
            return AddBlogActions.addBlogSuccess({
              message: response.message,
              postId: response.postId,
            });
          }),
          catchError((error) =>
            of(AddBlogActions.addBlogFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
