// blog.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from './blogs.reducer';

export const selectNewBlogState = createFeatureSelector<BlogState>('blogs');

export const selectBlogs = createSelector(
  selectNewBlogState,
  (state) => state.blogs
);

export const selectLoading = createSelector(
  selectNewBlogState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectNewBlogState,
  (state) => state.error
);

export const selectFilteredBlogs = createSelector(selectBlogs, (blogs) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return [];
  }

  return blogs.filter((blog) => blog.userId === userId);
});
