import { createAction, props } from '@ngrx/store';

export const addBlog = createAction(
  '[Blog] Add Blog',
  props<{ title: string; content: string; image: File; token: string }>()
);

export const addBlogSuccess = createAction(
  '[Blog] Add Blog Success',
  props<{ message: string; postId: number }>()
);

export const addBlogFailure = createAction(
  '[Blog] Add Blog Failure',
  props<{ error: string }>()
);
