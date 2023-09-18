import { createReducer, on } from '@ngrx/store';
import * as BlogActions from './blogs.actions';
import { Blog } from './BlogsInitialState';

export interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}
const singleBlogState = {};
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
export interface CommentUser {
  _id: string;
  username: string;
}
export interface AddComment {
  text: string;
  blogId: string;
  loading: boolean;
}
export interface GetComment {
  _id: string;
}
const initialStateGetComments: GetComment = {
  _id: '',
};
const initialStateAddComment: AddComment = {
  text: '',
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
export interface SingleBlogState {
  blog: any;
  loading: boolean;
}

const initialStateGetBlog: SingleBlogState = {
  blog: [],
  loading: false,
};
export const getBlogByIdReducer = createReducer(
  initialStateGetBlog,
  on(BlogActions.getBlogById, (state) => ({
    ...state,
    loading: true,
  })),
  on(BlogActions.getBlogByIdSuccess, (state, blog) => ({
    ...state,
    blog,
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
    loading: false,
  }))
);
export const getCommentsReducer = createReducer(
  initialStateGetComments,
  on(BlogActions.getComments, (state, { blogId }) => ({
    ...state,
    blogId,
    loading: true,
  })),
  on(BlogActions.getCommentsSuccess, (state, { message }) => ({
    ...state,
    message,
    loading: false,
  }))
);

export const addCommentReducer = createReducer(
  initialStateAddComment,
  on(BlogActions.addComment, (state, { blogId, text }) => ({
    ...state,
    blogId,
    text,
    loading: true,
  })),
  on(BlogActions.addCommentSuccess, (state, message: any) => ({
    ...state,
    message,
    loading: false,
  }))
);
