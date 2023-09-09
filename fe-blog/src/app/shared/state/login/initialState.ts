export interface LoginState {
  email: string;
  password: string;
  token: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}
export const initialState: LoginState = {
  email: '',
  password: '',
  token: '',
  loading: false,
  error: null,
  success: false,
};
