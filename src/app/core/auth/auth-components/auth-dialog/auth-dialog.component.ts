import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthDialogTab } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';
import { Credentials, CredentialsWithName } from '@core/auth/auth.model';
import { Store } from '@ngrx/store';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
  sendResetPasswordAction,
  sendResetPasswordFailureAction,
  sendResetPasswordSuccessAction,
  signInAction,
  signInFailureAction,
  signInSuccessAction
} from '@core/auth/auth.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil, tap } from 'rxjs/operators';
import { getIsLoadingObservable } from '@shared/utils/get-is-loading-observable';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit, OnDestroy {
  currentTab = AuthDialogTab.Login;
  AuthDialogTab = AuthDialogTab;
  isLoading$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        registerAction,
        signInAction,
        sendResetPasswordAction
      ],
      stopActions: [
        registerSuccessAction,
        registerFailureAction,
        signInSuccessAction,
        signInFailureAction,
        sendResetPasswordSuccessAction,
        sendResetPasswordFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  onSubmitClick() {

  }

  onCancelClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.actions$.pipe(
      ofType(sendResetPasswordSuccessAction),
      tap(action => this.currentTab = AuthDialogTab.Login),
      untilDestroyed(this)
    ).subscribe();
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

  ngOnDestroy(): void {
  }

  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private store: Store<any>,
    private actions$: Actions,
  ) {
  }

}
