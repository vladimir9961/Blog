import { createAction, props } from '@ngrx/store';
import { userLogin } from '../../models/login/userLogin';
import { User } from '../../models/login/user';

export const login = createAction(
  '[Login] LogedIn',
  props<{ userData: userLogin }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);
