import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Artist } from '@core/artist/artist.model';
import { TRANSLATIONS } from '@core/translation/translations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorOption } from '@shared/utils/selector-option';
import { ALL_MUSIC_GENRES } from '@core/models/music-genres.model';
import { ALL_ARTIST_TYPES, ArtistTypes } from '@core/models/artist-types.model';
import { TranslationService } from '@core/translation/translation.service';

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
    private formBuilder: FormBuilder
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
    const result: Partial<Artist> = this.form.value;
    console.error('onSubmit', result);
  }
}
