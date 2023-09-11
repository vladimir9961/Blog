import { createReducer, on } from '@ngrx/store';
import * as AddBlogActions from './addBlog.actions';

export interface BlogState {
  message: string | null;
  postId: number | null;
  error: string | null;
}

const initialState: BlogState = {
  message: null,
  postId: null,
  error: null,
};

export const newBlogReducer = createReducer(
  initialState,
  on(AddBlogActions.addBlogSuccess, (state, { message, postId }) => ({
    ...state,
    message,
    postId,
    error: null,
  })),
  on(AddBlogActions.addBlogFailure, (state, { error }) => ({
    ...state,
    message: null,
    postId: null,
    error,
  }))
);
