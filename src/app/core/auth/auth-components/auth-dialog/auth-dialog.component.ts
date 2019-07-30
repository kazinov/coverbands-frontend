import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthDialogTab } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';
import { Credentials, CredentialsWithName } from '@core/auth/auth.model';
import { Store } from '@ngrx/store';
import { registerAction, sendResetPasswordAction, signInAction } from '@core/auth/auth.actions';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  currentTab = AuthDialogTab.Login;
  AuthDialogTab = AuthDialogTab;
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
    this.store.dispatch(sendResetPasswordAction({email}));
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
    private store: Store<any>
  ) {
  }

}
