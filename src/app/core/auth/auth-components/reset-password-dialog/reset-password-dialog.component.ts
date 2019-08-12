import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { TRANSLATIONS } from '@core/translation/translations';
import { ResetPasswordDialogOptions } from '@core/auth/auth-components/reset-password-dialog/reset-password-dialog.model';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationUtils } from 'app/core/translation/translation.utils';
import {
  confirmResetPasswordAction,
  confirmResetPasswordFailureAction,
  confirmResetPasswordSuccessAction
} from '@core/auth/auth.actions';
import { getIsLoadingObservable } from '@shared/utils/get-is-loading-observable';
import { Actions } from '@ngrx/effects';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit, OnDestroy {
  t = TRANSLATIONS;
  TranslationUtils = TranslationUtils;
  PASSWORD_MIN_LENGTH = PASSWORD_MIN_LENGTH;
  PASSWORD_MAX_LENGTH = PASSWORD_MAX_LENGTH;
  form: FormGroup;
  passwordControl: AbstractControl;
  isLoading$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        confirmResetPasswordAction
      ],
      stopActions: [
        confirmResetPasswordSuccessAction,
        confirmResetPasswordFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

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

    this.store.dispatch(confirmResetPasswordAction({
      code: this.options.code,
      password: this.form.value.password
    }));
  }

  constructor(
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private options: ResetPasswordDialogOptions,
    private store: Store<any>,
    private actions$: Actions,
  ) {
  }

  ngOnDestroy(): void {
  }

}
