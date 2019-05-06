import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BandContacts } from './band-contacts.model';

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

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: [this.contacts ? this.contacts.email : null, [Validators.email]],
      phone: [this.contacts ? this.contacts.phone : null, []]
    });
  }

  onSubmit() {
    this.saveClick.emit(this.form.value);
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
