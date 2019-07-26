import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() forgotPassword = new EventEmitter();

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
        Validators.minLength(6),
        Validators.maxLength(25),
      ]));
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.valid) {
      return;
    }
  }
}
