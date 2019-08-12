import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TRANSLATIONS } from '@core/translation/translations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorOption } from '@shared/utils/selector-option';
import { ALL_ARTIST_TYPES } from '@core/models/artist-types.model';
import { Store } from '@ngrx/store';
import { createArtistAction } from '@artist-admin/artist-admin.actions';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArtistComponent implements OnInit {
  form: FormGroup;
  t = TRANSLATIONS;

  artistTypes: SelectorOption[]
    = ALL_ARTIST_TYPES.map((typeId) => ({
    id: typeId,
    label: TRANSLATIONS.artistTypes[typeId]
  }));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.store.dispatch(createArtistAction({
      artist: this.form.value
    }));
  }
}
