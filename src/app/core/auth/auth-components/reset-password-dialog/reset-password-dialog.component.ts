import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { TRANSLATIONS } from '@core/translation/translations';
import { ResetPasswordDialogOptions } from '@core/auth/auth-components/reset-password-dialog/reset-password-dialog.model';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {
  TRANSLATIONS = TRANSLATIONS;
  isLoading = false;

  onSubmitClick() {

  }

  onCancelClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }


  constructor(
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private options: ResetPasswordDialogOptions,
    private store: Store<any>
  ) {
  }

}
