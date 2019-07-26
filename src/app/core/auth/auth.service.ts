import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import { ReplaySubject } from 'rxjs';
import { FirebaseUserInfo } from '@core/firebase/firebase.model';
import { FirebaseService } from '@core/firebase/firebase.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthDialogComponent } from '@core/auth/auth-components/auth-dialog/auth-dialog.component';
import { AuthDialogOptions, AuthDialogTab } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';

@Injectable()
export class AuthService {
  private authStateSubject = new ReplaySubject<FirebaseUserInfo>();
  private authgDialogRef: MatDialogRef<any>;

  get authStateChanged$() {
    return this.authStateSubject.asObservable();
  }

  private init() {
    this.firebaseService.auth.onAuthStateChanged(this.authStateSubject);
  }

  openAuthDialog(tab?: AuthDialogTab) {
    this.authgDialogRef = this.dialog.open(AuthDialogComponent, {
      width: '600px',
      data: {
        tab
      } as AuthDialogOptions
    });
  }

  closeAuthDialog() {
    if (this.authgDialogRef) {
      this.authgDialogRef.close();
    }
  }

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog
  ) {
    this.init();
  }
}
