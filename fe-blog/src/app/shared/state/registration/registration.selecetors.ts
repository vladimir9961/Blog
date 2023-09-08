import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RegistrationState } from './initialRegistrationState';

// Create a feature selector for the registration state
export const selectRegistrationState =
  createFeatureSelector<RegistrationState>('registration');

// Define selectors for email, username, and password
export const selectEmail = createSelector(
  selectRegistrationState,
  (state) => state.email
);

export const selectUsername = createSelector(
  selectRegistrationState,
  (state) => state.username
);

export const selectPassword = createSelector(
  selectRegistrationState,
  (state) => state.password
);
