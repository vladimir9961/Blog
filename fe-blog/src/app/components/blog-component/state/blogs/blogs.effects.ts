import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import * as BlogActions from './blogs.actions';
import { BlogsService } from 'src/app/shared/service/blogs/blogs.service';
import { Blog } from 'src/app/shared/models/blog.model';
import { UserService } from 'src/app/shared/service/user/user.service';
import { Store } from '@ngrx/store';

@Injectable()
export class BlogEffects {
  userId: string | null;
  constructor(
    private actions$: Actions,
    private blogService: BlogsService,
    private userService: UserService,
    private store: Store
  ) {
    this.userId = this.userService.getUserId();
  }

  formatRelativeTime(timestamp: string | null): any {
    if (!timestamp) {
      return 'Timestamp is null';
    }

    try {
      const createdAt = DateTime.fromISO(timestamp);
      if (createdAt.isValid) {
        return createdAt.toRelative();
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
            const likedAndCreatedAt = blogs.map((blog, index) => ({
              ...blog,
              liked: blog.likes.some((like) => like.userId === this.userId),
              created_at: this.formatRelativeTime(blogs[index].created_at),
            }));
            // localStorage.setItem('blogs', JSON.stringify(likedAndCreatedAt));

            return BlogActions.loadBlogsSuccess({
              blogs: likedAndCreatedAt,
            });
          }),
          catchError((error) =>
            of(BlogActions.loadBlogsFailure({ error: error.message }))
          )
        )
      )
    )
  );
  getBlogById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.getBlogById),
      mergeMap((action) =>
        this.blogService.getBlogById(action.blogId).pipe(
          map((blog) => {
            return BlogActions.getBlogByIdSuccess(blog);
          })
        )
      )
    )
  );
  DislakeBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.dislikeBlog),
      mergeMap((action) =>
        this.blogService.dislakeBlog(action.blogId).pipe(
          map((blog) => {
            this.store.dispatch(BlogActions.loadBlogs());
            return BlogActions.dislikeBlogSuccess(blog);
          })
        )
      )
    )
  );
  LikeBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.likeBlog),
      mergeMap((action) =>
        this.blogService.likeBlog(action.blogId).pipe(
          map((blog) => {
            this.store.dispatch(BlogActions.loadBlogs());
            return BlogActions.likeBlogSuccess(blog);
          })
        )
      )
    )
  );
  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.getComments),
      mergeMap((action) => {
        const blogId = action.blogId;
        return this.blogService.getComment(blogId).pipe(
          map((comment) => {
            return BlogActions.getCommentsSuccess({ message: comment });
          })
        );
      })
    )
  );
  AddComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.addComment),
      mergeMap((action) =>
        this.blogService.addComment(action.blogId, action.text).pipe(
          map((comment) => {
            console.log(comment);

            return BlogActions.addCommentSuccess(comment);
          })
        )
      )
    )
  );
}
