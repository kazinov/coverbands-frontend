export const AUTH_STORE_KEY = 'auth';

export interface Credentials {
  email: string;
  password: string;
}

export interface CredentialsWithName extends Credentials {
  name: string;
}
