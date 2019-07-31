import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { TRANSLATIONS } from '@core/translation/translations';
import { ResetPasswordDialogOptions } from '@core/auth/auth-components/reset-password-dialog/reset-password-dialog.model';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationUtils } from 'app/core/translation/translation.utils';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {
  t = TRANSLATIONS;
  TranslationUtils = TranslationUtils;
  isLoading = false;
  PASSWORD_MIN_LENGTH = PASSWORD_MIN_LENGTH;
  PASSWORD_MAX_LENGTH = PASSWORD_MAX_LENGTH;
  form: FormGroup;
  passwordControl: AbstractControl;

  private initForm() {
    this.form = new FormGroup({});
    this.form.registerControl('password', this.passwordControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.maxLength(PASSWORD_MAX_LENGTH),
      ]));
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

  }

  constructor(
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private options: ResetPasswordDialogOptions,
    private store: Store<any>
  ) {
  }

}
