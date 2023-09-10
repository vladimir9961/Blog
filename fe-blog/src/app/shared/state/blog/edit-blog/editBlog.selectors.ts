import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Blog } from 'src/app/shared/models/blog.model';

export const selectBlogState = createFeatureSelector<Blog>('getBlog');

export const selectBlog = createSelector(selectBlogState, (state) => state);
