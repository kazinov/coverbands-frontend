import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artist } from '../../core/bands/bands.model';

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
  selector: 'app-edit-artist-contacts',
  templateUrl: './edit-artist-contacts.component.html',
  styleUrls: ['./edit-artist-contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistContactsComponent implements OnInit {
  @Input() artist: Artist;
  @Output() saveClick = new EventEmitter<Partial<Artist>>();
  form: FormGroup;
  phoneConfig: PhoneFormInputConfig = russianPhoneConfig;
  linksTableColumns: string[] = ['link', 'description'];

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.form = this.formBuilder.group({
      [emailFormName]: [this.artist ? this.artist.email : null, [Validators.email]],
      [phoneNumberFormName]: [this.artist ? this.artist.phoneNumber : null,
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
