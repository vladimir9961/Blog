// blog.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState, SingleBlogState } from './blogs.reducer';
export interface commentState {
  message: Comment[];
}
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
export const selectComments =
  createFeatureSelector<commentState>('getComments');
export const selectComent = createSelector(
  selectComments,
  (state) => state.message
);
export const selectBlogFeature =
  createFeatureSelector<SingleBlogState>('getBlogById');

export const selectBlogData = createSelector(
  selectBlogFeature,
  (state: SingleBlogState) => state
);
