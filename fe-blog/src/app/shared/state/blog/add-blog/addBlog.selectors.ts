import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AddBlog } from './addBlogInitialState';

export const selectLoginState = createFeatureSelector<AddBlog>('login');

export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state) => state
);

export const selectMessage = createSelector(
  selectLoginState,
  (state) => state.message
);
