import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './user.actions';
import { initialState } from './initialState';

export const LOGIN_START = '[auth page] login start';

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(LoginActions.autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(LoginActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
  })),
  on(LoginActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(LoginActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  }))
);
