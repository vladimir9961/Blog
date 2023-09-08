import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoginState } from './initialState';

// Create a feature selector for the registration state
export const selectLoginState = createFeatureSelector<LoginState>('login');

// Define selectors for email, username, and password
export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state) => state.email
);

// export const selectUsername = createSelector(
//     selectLoginState,
//   (state) => state.username
// );

export const selectPassword = createSelector(
  selectLoginState,
  (state) => state.password
);
