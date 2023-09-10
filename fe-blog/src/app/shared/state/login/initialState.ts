export interface LoginState {
  email: string | null;
  password: string;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
export const initialState: LoginState = {
  email: null,
  password: '',
  token: null,
  loading: false,
  error: null,
  success: false,
};
export interface AuthState {
  userId: string | null;
  token: string | null;
}
