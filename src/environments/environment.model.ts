import { FirebaseOptions } from '@core/firebase/firebase.service';

export interface EnvironmentConfig {
  production: boolean;
  firebase: FirebaseOptions;
}
