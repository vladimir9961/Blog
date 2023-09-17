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
  message: string;
  blogId: string;
  loading: boolean;
}
const initialStateLike: Like = {
  message: '',
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
export const dislikeReducer = createReducer(
  initialStateLike,
  on(BlogActions.dislikeBlog, (state, { blogId }) => ({
    ...state,
    blogId,
    loading: true,
  })),
  on(BlogActions.dislikeBlogSuccess, (state, message: any) => ({
    ...state,
    message,
    loading: false,
  }))
);
export const likeReducer = createReducer(
  initialStateLike,
  on(BlogActions.likeBlog, (state, { blogId }) => ({
    ...state,
    blogId,
    loading: true,
  })),
  on(BlogActions.likeBlogSuccess, (state, message: any) => ({
    ...state,
    message,
    loading: true,
  }))
);
