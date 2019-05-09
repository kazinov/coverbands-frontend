import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BandContacts } from './band-contacts.model';

interface PhoneFormInputConfig {
  mask: string,
  validationRegex: RegExp,
  code: string
}

const russianPhoneConfig = {
  mask: '+{7}(000)000-00-00',
  validationRegex: /(^[0-9]{11}$)|(^7$)/,
  code: '7'
};

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
      email: [this.contacts ? this.contacts.email : null, [Validators.email]],
      phone: [this.contacts ? this.contacts.phone : null,
        [Validators.pattern(this.phoneConfig.validationRegex)]]
    });
  }

  onSubmit() {
    this.saveClick.emit(this.form.value);
  }

  get noValues() {
    return !this.form.value.email && (
      !this.form.value.phone || (this.form.value.phone === this.phoneConfig.code)
    );
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
