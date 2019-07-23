import { environment as environmentDev } from './environment.dev';
import { EnvironmentConfig } from './environment.model';

export const environment: EnvironmentConfig = {
  production: environmentDev.production,
  firebase: environmentDev.firebase
};
