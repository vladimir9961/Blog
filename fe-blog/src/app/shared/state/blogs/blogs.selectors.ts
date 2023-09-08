// blog.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from './blogs.reducer';

export const selectBlogState = createFeatureSelector<BlogState>('blogs');

export const selectBlogs = createSelector(
  selectBlogState,
  (state) => state.blogs
);

export const selectLoading = createSelector(
  selectBlogState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectBlogState,
  (state) => state.error
);
