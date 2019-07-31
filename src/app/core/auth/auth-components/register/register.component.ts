import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH } from '@core/auth/auth-components/auth-dialog/auth-dialog.model';
import { CredentialsWithName } from '@core/auth/auth.model';
import { EMAIL_REGEX } from '@core/auth/auth-components/auth-components.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() register = new EventEmitter<CredentialsWithName>();
  @Output() goToLogIn = new EventEmitter();

  form: FormGroup;
  // nameControl: AbstractControl;
  emailControl: AbstractControl;
  passwordControl: AbstractControl;

  PASSWORD_MIN_LENGTH = PASSWORD_MIN_LENGTH;
  PASSWORD_MAX_LENGTH = PASSWORD_MAX_LENGTH;

  NAME_MIN_LENGTH = NAME_MIN_LENGTH;
  NAME_MAX_LENGTH = NAME_MAX_LENGTH;

  private init() {
    this.form = new FormGroup({
      // name: this.nameControl = new FormControl('',
      //   [
      //     Validators.required,
      //     Validators.minLength(NAME_MIN_LENGTH),
      //     Validators.maxLength(NAME_MAX_LENGTH),
      //   ]),
      email: this.emailControl = new FormControl('',
        [
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ]),
      password: this.passwordControl = new FormControl('',
        [
          Validators.required,
          Validators.minLength(PASSWORD_MIN_LENGTH),
          Validators.maxLength(PASSWORD_MAX_LENGTH),
        ])
    });
  }

  ngOnInit() {
    this.init();
  }


  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.register.emit(this.form.value);
  }

  constructor() { }

}
