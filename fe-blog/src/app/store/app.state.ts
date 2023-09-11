import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthState } from '../components/user/state/initialState';
import { AUTH_STATE_NAME } from '../components/user/state/user.selectors';

export interface AppState {
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState;
}

export const appReducer = {
  router: routerReducer,
};
