// blog.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Blog } from './BlogsInitialState';
import * as BlogActions from './blogs.actions';

export interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

export const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
};

export const blogReducer = createReducer(
  initialState,
  on(BlogActions.loadBlogsSuccess, (state, { blogs }) => ({
    ...state,
    blogs,
    loading: false,
  }))
);
