import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BandContacts } from './band-contacts.model';

interface PhoneFormInputConfig {
  mask: string,
  validationRegex: RegExp,
  phoneCode: string
}

const russianPhoneCode = '+7';
const russianPhoneConfig = {
  mask: `${russianPhoneCode}(000)000-00-00`,
  validationRegex: /(^[0-9]{10}$)/,
  phoneCode: russianPhoneCode
};
const emailFormName = 'email';
const phoneNumberFormName = 'phoneNumber';

@Component({
  selector: 'app-band-contacts',
  templateUrl: './band-contacts.component.html',
  styleUrls: ['./band-contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandContactsComponent implements OnInit {
  @Input() contacts: BandContacts;
  @Output() saveClick = new EventEmitter<BandContacts>();
  form: FormGroup;

  phoneConfig: PhoneFormInputConfig = russianPhoneConfig;

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      [emailFormName]: [this.contacts ? this.contacts.email : null, [Validators.email]],
      [phoneNumberFormName]: [this.contacts ? this.contacts.phoneNumber : null,
        [Validators.pattern(this.phoneConfig.validationRegex)]]
    });
  }

  onSubmit() {
    this.saveClick.emit({
      email: this.form.value[emailFormName],
      phoneCode: this.phoneConfig.phoneCode,
      phoneNumber: this.form.value[phoneNumberFormName]
    });
  }

  get noValues() {
    return !this.form.value[emailFormName] && (
      !this.form.value[phoneNumberFormName]
    );
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
