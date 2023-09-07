import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: LoginState = {
  email: '',
  password: '',
  loading: false,
  error: null,
  success: false,
};

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
