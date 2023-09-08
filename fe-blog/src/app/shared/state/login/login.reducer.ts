import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { initialState } from './initialState';

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(LoginActions.loginSuccess, (state) => ({
    ...state,
    status: state,
    loading: false,
    success: true,
  })),
  on(LoginActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  }))
);
