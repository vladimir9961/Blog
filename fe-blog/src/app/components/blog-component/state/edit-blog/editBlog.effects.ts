import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  editPost,
  editPostSuccess,
  getPost,
  getPostSuccess,
} from './editBlog.actions';
import { EditBlogService } from 'src/app/shared/service/blogs/edit-blog.service';

@Injectable()
export class GetPostEffect {
  constructor(
    private actions$: Actions,
    private blogService: EditBlogService
  ) {}

  getPostId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPost),
      switchMap((action) =>
        this.blogService.getBlog(action.blogId).pipe(
          map((response) => {
            return getPostSuccess({ response });
          })
        )
      )
    )
  );
}
@Injectable()
export class BlogEffects {
  constructor(
    private actions$: Actions,
    private blogService: EditBlogService
  ) {}

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPost),
      switchMap(({ _id, title, content, imageUrl }) =>
        this.blogService.editBlog({ _id, title, content, imageUrl }).pipe(
          map((response) => {
            console.log(response);
            return editPostSuccess({ response: response });
          })
        )
      )
    )
  );
}
