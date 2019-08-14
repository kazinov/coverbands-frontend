import * as firebase from 'firebase/app';
import { HttpError } from '@shared/types/http-error';
import { FirebaseError } from 'firebase';

export type FirebaseApp = firebase.app.App;
export type FirebaseAuth = firebase.auth.Auth;
export type FirebaseUserInfo = firebase.UserInfo;
export type FirebaseUserCredentials = firebase.auth.UserCredential;
export type FirebaseDocumentReference = firebase.firestore.DocumentReference;
export type FirebaseDocumentSnapshot = firebase.firestore.DocumentSnapshot;
export type FirebaseDocumentData = firebase.firestore.DocumentData;
export type FirebaseTimestamp = firebase.firestore.Timestamp;
export type FirebaseStorageReference = firebase.storage.Reference;
export type FirebaseUploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

export function parseFirebaseError(input: FirebaseError): HttpError {
  return input && input.code ? {
    code: input.code
  } : {
    code: 'unknown-error'
  };
}
