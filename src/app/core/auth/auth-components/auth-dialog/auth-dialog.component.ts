import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthDialogOptions } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';
import { Credentials } from '@core/auth/auth.model';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  isLoading = false;

  onSubmitClick() {

  }

  onCancelClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onGoToForgotPassword() {
    console.error('onGoToForgotPassword');
  }

  onGoToRegister() {
    console.error('onGoToRegister');
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
