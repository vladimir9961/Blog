import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './initialState';
export const AUTH_STATE_NAME = 'auth';

export const selectLoginState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state) => state
);
export const isAuthenticated = createSelector(selectLoginState, (state) => {
  return state.user ? true : false;
});
export const selectEmail = createSelector(selectLoginState, (state) => state);

export const selectUsername = createSelector(
  selectLoginState,
  (state) => state
);

export const selectPassword = createSelector(
  selectLoginState,
  (state) => state
);
export const getToken = createSelector(selectLoginState, (state) =>
  state.user ? state.user.userToken : null
);
