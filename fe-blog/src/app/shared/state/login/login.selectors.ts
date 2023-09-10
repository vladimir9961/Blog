import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState, LoginState } from './initialState';

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
export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectUserId = createSelector(
  selectAuthState,
  (state) => state.userId
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
