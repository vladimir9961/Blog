import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login] LogedIn',
  props<{ email: string; password: string }>()
);
export const logout = createAction('[Auth] Logout');

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ email: string; token: string; userId: string }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);
