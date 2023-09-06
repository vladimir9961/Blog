// In your AppState file (e.g., app-state.ts)
export interface AppState {
  registration: RegistrationState;
}

export interface RegistrationState {
  username: string;
  email: string;
  password: string;
}
