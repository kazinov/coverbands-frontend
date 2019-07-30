import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import { from, Observable, ReplaySubject } from 'rxjs';
import { FirebaseUserCredentials, FirebaseUserInfo } from '@core/firebase/firebase.model';
import { FirebaseService } from '@core/firebase/firebase.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthDialogComponent } from '@core/auth/auth-components/auth-dialog/auth-dialog.component';
import { Credentials } from '@core/auth/auth.model';
import { catchError } from 'rxjs/operators';
import { fromFirebaseError } from '@core/firebase/util/from-firebase-error';
import { ResetPasswordDialogComponent } from '@core/auth/auth-components/reset-password-dialog/reset-password-dialog.component';
import { ResetPasswordDialogOptions } from '@core/auth/auth-components/reset-password-dialog/reset-password-dialog.model';

@Injectable()
export class AuthService {
  private authStateSubject = new ReplaySubject<FirebaseUserInfo>();
  private authDialogRef: MatDialogRef<any>;
  private resetPasswordDialogRef: MatDialogRef<any>;

  get authStateChanged$() {
    return this.authStateSubject.asObservable();
  }

  register(credentials: Credentials): Observable<FirebaseUserCredentials> {
    return from(this.firebaseService.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    )).pipe(catchError(fromFirebaseError));
  }

  signOut(): Observable<void> {
    return from(this.firebaseService.auth.signOut())
      .pipe(catchError(fromFirebaseError));
  }

  signIn(
    email: string,
    password: string
  ): Observable<FirebaseUserCredentials> {
    return from(this.firebaseService.auth.signInWithEmailAndPassword(email, password))
      .pipe(catchError(fromFirebaseError));
  }

  sendResetPassword(email: string) {
    return from(this.firebaseService.auth.sendPasswordResetEmail(email))
      .pipe(catchError(fromFirebaseError));
  }

  confirmResetPassword(code: string, newPassword: string) {
    return from(this.firebaseService.auth.confirmPasswordReset(code, newPassword))
      .pipe(catchError(fromFirebaseError));
  }

  private init() {
    this.firebaseService.auth.onAuthStateChanged(this.authStateSubject);
  }

  openAuthDialog() {
    this.authDialogRef = this.dialog.open(AuthDialogComponent);
  }

  closeAuthDialog() {
    if (this.authDialogRef) {
      this.authDialogRef.close();
    }
  }

  openResetPasswordDialog(code: string) {
    this.resetPasswordDialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      data: {
        code
      } as ResetPasswordDialogOptions
    });
  }

  closeResetPasswordDialog() {
    if (this.resetPasswordDialogRef) {
      this.resetPasswordDialogRef.close();
    }
  }

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog
  ) {
    this.init();
  }
}
