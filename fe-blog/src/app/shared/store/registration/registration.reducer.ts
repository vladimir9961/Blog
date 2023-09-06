// reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as RegistrationActions from './registration.actions';

export interface RegistrationState {
  email: string;
  password: string;
  username: string;
  loading: boolean;
  error: string | null;
}

export const initialState: RegistrationState = {
  email: '',
  password: '',
  username: '',
  loading: false,
  error: null,
};

export const registrationReducer = createReducer(
  initialState,
  on(RegistrationActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RegistrationActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(RegistrationActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
