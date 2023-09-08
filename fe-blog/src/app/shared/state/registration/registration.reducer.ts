// reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as RegistrationActions from './registration.actions';
import { initialState } from './initialRegistrationState';

export const registrationReducer = createReducer(
  initialState,
  on(RegistrationActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
  })),
  on(RegistrationActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(RegistrationActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  }))
);
