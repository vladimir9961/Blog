import { createAction, props } from '@ngrx/store';

export const getPost = createAction(
  '[Get Post] Get Post',
  props<{ blogId: string }>()
);
export const getPostSuccess = createAction(
  '[Get Post Success] Get Post Success',
  props<{ response: any }>()
);
export const editPost = createAction(
  '[Edit Post] Edit Post',
  props<{ _id: string; title: string; content: string; imageUrl: string }>()
);
export const editPostSuccess = createAction(
  '[Edit Post] Edit Post',
  props<{ response: any }>()
);
export type PostAction = ReturnType<typeof editPost>;
