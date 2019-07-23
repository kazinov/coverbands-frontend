import { EnvironmentConfig } from './environment.model';
import * as firebase from '../../firebase.json';

export const environment: EnvironmentConfig = {
  production: true,
  firebase: firebase.production
};
