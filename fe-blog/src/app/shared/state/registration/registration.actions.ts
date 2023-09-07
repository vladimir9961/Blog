// actions.ts
import { createAction, props } from '@ngrx/store';
import { UserData } from '../../models/userData';
import { User } from '../../models/login/user';

export const register = createAction(
  '[Registration] Register',
  props<{ userData: UserData }>()
);

export const registerSuccess = createAction(
  '[Registration] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Registration] Register Failure',
  props<{ error: string }>()
);
