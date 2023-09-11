import { User } from '../../../shared/models/login/user.model';

export interface UserState {
  email: string | null;
  password: string;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
export const initialState: UserState = {
  email: null,
  password: '',
  token: null,
  loading: false,
  error: null,
  success: false,
};
export interface AuthState {
  user: User | null;
}
