// blog.actions.ts
import { createAction, props } from '@ngrx/store';
import { Blog } from './BlogsInitialState';
import { SingleBlogState } from './blogs.reducer';

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
export const getBlogById = createAction(
  '[Get Blog By Id] Get Blog By Id',
  props<{ blogId: string }>()
);

export const getBlogByIdSuccess = createAction(
  '[Get Blog By Id Success] Get Blog By Id Success',
  props<{ blog: any }>()
);
export const likeBlog = createAction(
  '[Like] Like Blog',
  props<{ blogId: string }>()
);
export const likeBlogSuccess = createAction(
  '[Like Success] Like Success Blog',
  props<{ message: any }>()
);
export const dislikeBlog = createAction(
  '[Dislike] Dislike Blog',
  props<{ blogId: string }>()
);
export const dislikeBlogSuccess = createAction(
  '[Dislike Success] Dislike Success Blog',
  props<{ message: any }>()
);

export const getComments = createAction(
  '[Get Comments] Get Comments',
  props<{ blogId: string }>()
);
export const getCommentsSuccess = createAction(
  '[Get Comments Success] Get Comments Success',
  props<{ message: any }>()
);
export const addComment = createAction(
  '[Add Comment] Add Comment',
  props<{ blogId: string; text: string }>()
);
export const addCommentSuccess = createAction(
  '[Add Comment Success] Add Comment Success',
  props<{ message: any }>()
);
