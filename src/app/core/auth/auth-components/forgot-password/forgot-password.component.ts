import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @Output() goBack = new EventEmitter();
  @Output() resetPassword = new EventEmitter<string>();
  form: FormGroup;

  emailControl: AbstractControl;

  private initForm() {
    this.form = new FormGroup({});
    this.form.registerControl('email', this.emailControl = new FormControl('',
      [
        Validators.required,
        Validators.email
      ]));
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.resetPassword.emit(this.form.value.email);
  }

  constructor() {
  }

}
