import { FirebaseUserInfo } from '@core/firebase/firebase.model';

export const AUTH_STORE_KEY = 'auth';

export interface Credentials {
  email: string;
  password: string;
}

export interface CredentialsWithName extends Credentials {
  name: string;
}

export interface AppUserInfo {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
}

export abstract class AppUserInfoHelpers {
  static fromFirebaseUserInfo(input: FirebaseUserInfo): AppUserInfo {
    if (!input) {
      return null;
    }
    return {
      displayName: input.displayName,
      email: input.email,
      phoneNumber: input.phoneNumber,
      photoURL: input.photoURL,
      providerId: input.providerId,
      uid: input.uid,
    };
  }
}
