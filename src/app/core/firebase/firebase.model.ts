import * as firebase from 'firebase/app';
import { HttpError } from '@shared/types/http-error';
import { FirebaseError } from 'firebase';

export type FirebaseApp =  firebase.app.App;
export type FirebaseAuth = firebase.auth.Auth;
export type FirebaseUserInfo = firebase.UserInfo;
export type FirebaseUserCredentials = firebase.auth.UserCredential;

export function parseFirebaseError(input: FirebaseError): HttpError {
  return input && {
    code: input.code
  };
}
