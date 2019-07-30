import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthDialogOptions, AuthDialogTab } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';
import { Credentials, CredentialsWithName } from '@core/auth/auth.model';
import { Store } from '@ngrx/store';
import { registerAction, resetPasswordAction, signInAction } from '@core/auth/auth.actions';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  currentTab = AuthDialogTab.Login;
  AuthDialogTab = AuthDialogTab;
  passwordResetLinkSentEmail = 'blabla@bla.com'
  isLoading = false;

  onSubmitClick() {

  }

  onCancelClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  goToForgotPassword() {
    this.currentTab = AuthDialogTab.ForgotPassword;
  }

  goToRegister() {
    this.currentTab = AuthDialogTab.Register;
  }

  goToTab(tab: AuthDialogTab) {
    this.currentTab = tab;
  }

  onSignIn(credentials: Credentials) {
    this.store.dispatch(signInAction({
      email: credentials.email,
      password: credentials.password
    }));
  }

  onRegister(credentials: CredentialsWithName) {
    this.store.dispatch(registerAction({credentials}));
  }

  onResetPassword(email) {
    this.store.dispatch(resetPasswordAction({email}));
  }

  get header() {
    switch (this.currentTab) {
      case AuthDialogTab.ForgotPassword:
        return 'Восстановление пароля';
      case AuthDialogTab.Login:
        return 'Вход';
      case AuthDialogTab.Register:
        return 'Регистрация';
    }
  }

  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private options: AuthDialogOptions,
    private store: Store<any>
  ) {
  }

}
