export interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}
export const initialState: LoginState = {
  email: '',
  password: '',
  loading: false,
  error: null,
  success: false,
};
