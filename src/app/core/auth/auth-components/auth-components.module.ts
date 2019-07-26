import { NgModule } from '@angular/core';
import { AuthDialogComponent } from '@core/auth/auth-components/auth-dialog/auth-dialog.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from '@core/auth/auth-components/register/register.component';
import { ForgotPasswordComponent } from '@core/auth/auth-components/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [],
  declarations: [
    AuthDialogComponent,
    SignInComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  entryComponents: [AuthDialogComponent]
})
export class AuthComponentsModule {
}
