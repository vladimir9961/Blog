// blog.actions.ts
import { createAction, props } from '@ngrx/store';
import { Blog } from './BlogsInitialState';

export const loadBlogs = createAction('[Blog] Load Blogs');
export const loadBlogsSuccess = createAction(
  '[Blog] Load Blogs Success',
  props<{ blogs: Blog[] }>()
);

export const loadBlogsFailure = createAction(
  '[Blog] Load Blogs Failure',
  props<{ error: string }>()
);
export const loadBlogsByUserId = createAction(
  '[Blog] Load Blogs By User Id',
  props<{ userId: string }>()
);
export const likeBlog = createAction(
  '[Like] Like Blog',
  props<{ blogId: string }>()
);
