import { NgModule } from '@angular/core';
import { AuthDialogComponent } from '@core/auth/auth-components/auth-dialog/auth-dialog.component';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [],
  declarations: [AuthDialogComponent],
  entryComponents: [AuthDialogComponent]
})
export class AuthComponentsModule {
}
