import { createReducer, on, ActionCreator } from '@ngrx/store';
import * as PostActions from './editBlog.actions';

export interface PostState {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
}

export const initialState: PostState = {
  _id: '',
  title: '',
  content: '',
  imageUrl: '',
  userId: '',
};
export const blogReducer = createReducer(
  initialState,
  on(PostActions.getPostSuccess, (state, { response }) => ({
    ...state,
    _id: response._id,
    title: response.title,
    content: response.content,
    imageUrl: response.imageUrl,
    userId: response.userId,
  }))
);
