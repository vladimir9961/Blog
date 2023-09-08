export interface RegistrationState {
  email: string;
  password: string;
  username: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: RegistrationState = {
  email: '',
  password: '',
  username: '',
  loading: false,
  error: null,
  success: false,
};
