import { NgModule } from '@angular/core';
import { AuthDialogComponent } from '@core/auth/auth-components/auth-dialog/auth-dialog.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from '@core/auth/auth-components/register/register.component';
import { ForgotPasswordComponent } from '@core/auth/auth-components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { ResetPasswordDialogComponent } from '@core/auth/auth-components/reset-password-dialog/reset-password-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatPasswordStrengthModule
  ],
  providers: [],
  bootstrap: [],
  declarations: [
    AuthDialogComponent,
    SignInComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordDialogComponent
  ],
  entryComponents: [
    AuthDialogComponent,
    ResetPasswordDialogComponent
  ]
})
export class AuthComponentsModule {
}
