import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoginState } from './initialState';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state) => state
);

export const selectPassword = createSelector(
  selectLoginState,
  (state) => state.password
);
export const selectLoginToken = createSelector(
  selectLoginState,
  (state) => state.token
);
