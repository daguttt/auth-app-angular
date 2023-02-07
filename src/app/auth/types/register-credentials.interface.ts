import { LoginCredentials } from './login-credentials.interface';

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
}
