// blog.actions.ts
import { createAction, props } from '@ngrx/store';
import { Blog } from '../../models/blog.model';

export const loadBlogs = createAction('[Blog] Load Blogs');
export const loadBlogsSuccess = createAction(
  '[Blog] Load Blogs Success',
  props<{ blogs: Blog[] }>()
);
export const loadBlogsFailure = createAction(
  '[Blog] Load Blogs Failure',
  props<{ error: string }>()
);
