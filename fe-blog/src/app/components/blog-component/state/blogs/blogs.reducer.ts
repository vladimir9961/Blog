import { createReducer, on } from '@ngrx/store';
import * as BlogActions from './blogs.actions';
import { Blog } from './BlogsInitialState';

export interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
};
export interface Like {
  blogId: string;
  loading: boolean;
}
const initialStateLike: Like = {
  blogId: '',
  loading: false,
};
export const blogReducer = createReducer(
  initialState,
  on(BlogActions.loadBlogs, (state) => ({
    ...state,
    loading: true,
  })),
  on(BlogActions.loadBlogsSuccess, (state, { blogs }) => ({
    ...state,
    blogs,
    loading: false,
  })),
  on(BlogActions.loadBlogsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
export const likeReducer = createReducer(
  initialStateLike,
  on(BlogActions.dislakeBlog, (state, { blogId }) => ({
    ...state,
    blogId,
    loading: true,
  }))
);
