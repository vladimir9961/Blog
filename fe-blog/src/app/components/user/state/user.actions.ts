import { createAction, props } from '@ngrx/store';
import { User } from '../../../shared/models/login/user.model';
import { UserData } from '../../../shared/models/userData';
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login Success';
export const LOGOUT_ACTION = '[auth page] logout';
export const AUTO_LOGIN_ACTION = '[auth page] auto login';
export const login = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User | null; redirect: boolean }>()
);
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

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(LOGOUT_ACTION);
