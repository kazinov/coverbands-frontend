import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '@core/auth/auth.model';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() goToForgotPassword = new EventEmitter();
  @Output() goToRegister = new EventEmitter();
  @Output() signIn = new EventEmitter<Credentials>();
  PASSWORD_MIN_LENGTH = PASSWORD_MIN_LENGTH;
  PASSWORD_MAX_LENGTH = PASSWORD_MAX_LENGTH;

  form: FormGroup;
  emailControl: AbstractControl;
  passwordControl: AbstractControl;

  private initForm() {
    this.form = new FormGroup({});
    this.form.registerControl('email', this.emailControl = new FormControl('',
      [
        Validators.required,
        Validators.email
      ]));
    this.form.registerControl('password', this.passwordControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        Validators.maxLength(PASSWORD_MAX_LENGTH),
      ]));
  }

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.signIn.emit(this.form.value);
  }
}
