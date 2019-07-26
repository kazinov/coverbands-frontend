import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthDialogOptions, AuthDialogTab } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';
import { Credentials } from '@core/auth/auth.model';

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

  onGoToForgotPassword() {
    this.currentTab = AuthDialogTab.ForgotPassword;
  }

  onGoToRegister() {
    this.currentTab = AuthDialogTab.Register;
  }

  onSignIn(credentials: Credentials) {
    console.error('sign in', credentials);
  }

  constructor(
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: AuthDialogOptions,
  ) {
  }

}
