import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Get Map] Map',
  props<{ username: string; password: string }>()
);
