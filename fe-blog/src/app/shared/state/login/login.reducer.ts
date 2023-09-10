import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { initialState } from './initialState';

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(LoginActions.loginSuccess, (state, { email, token }) => ({
    ...state,
    email,
    token,
    loading: false,
    success: true,
  })),
  on(LoginActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  })),
  on(LoginActions.logout, (state) => ({
    ...state,
    userId: null,
    token: null,
    loading: false,
    error: null,
  }))
);
