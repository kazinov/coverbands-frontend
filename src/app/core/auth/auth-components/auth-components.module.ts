import { NgModule } from '@angular/core';
import { AuthDialogComponent } from '@core/auth/auth-components/auth-dialog/auth-dialog.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';

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
  declarations: [AuthDialogComponent],
  entryComponents: [AuthDialogComponent]
})
export class AuthComponentsModule {
}
