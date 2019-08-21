import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import omit from 'lodash-es/omit';
import assign from 'lodash-es/assign';
import { SelectorOption } from '@shared/utils/selector-option';
import { Artist } from '@core/artist/artist.model';
import { ALL_MUSIC_GENRES } from '@core/models/music-genres.model';
import { ALL_RUSSIAN_CITIES } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';
import { TRANSLATIONS } from '@core/translation/translations';
import { EditArtistTabBase } from '@artist-admin/edit-artist/edit-artist-tab-base';
import { EditableArtistField } from '@artist-admin/edit-artist/edit-artist/edit-artist.model';
import { ALL_DANCE_GENRES } from '@core/models/dance-genres.model';

const cityFilterFieldName = 'cityFilter';

@Component({
  selector: 'app-edit-artist-main-info',
  templateUrl: './edit-artist-main-info.component.html',
  styleUrls: ['./edit-artist-main-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistMainInfoComponent
  extends EditArtistTabBase
  implements OnInit, OnDestroy {
  t = TRANSLATIONS;
  @Input() saveButtonText = this.t.editArtist.saveButton;
  @Input() artist: Artist;
  @Input() hideDescription: boolean;
  @Output() saveClick = new EventEmitter<Artist>();
  form: FormGroup;

  musicGenres: SelectorOption[]
    = ALL_MUSIC_GENRES.map((genreId) => ({
    id: genreId,
    label: TRANSLATIONS.musicGenres[genreId]
  }));

  danceGenres: SelectorOption[]
    = ALL_DANCE_GENRES.map((genreId) => ({
    id: genreId,
    label: TRANSLATIONS.danceGenres[genreId]
  }));

  cities: SelectorOption[]
    = ALL_RUSSIAN_CITIES.map((cityId) => ({
    id: cityId,
    label: TRANSLATIONS.cities[Countries.Russia][cityId]
  }));

  filteredCities: SelectorOption[] = this.cities.slice();
  onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm();

    this.form.get(cityFilterFieldName).valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((search) => this.filterBanks(search));
  }

  filterBanks(search: string) {
    if (!search) {
      this.filteredCities = this.cities.slice();
    } else {
      search = search.toLowerCase();
      this.filteredCities
        = this.cities
        .filter(city => city.label.toLowerCase().indexOf(search) > -1);
    }
  }

  private buildForm(): void {
    const config: {
      [key: string]: any;
    } = {
      name: [this.artist ? this.artist.name : null, [Validators.required]],
      description: [this.artist ? this.artist.description : null, []],
      [cityFilterFieldName]: [null, []],
      city: [this.artist ? this.artist.city : null, [Validators.required]]
    };

    if (this.isFieldVisible(EditableArtistField.MusicGenres)) {
      config.musicGenres = [this.artist ? this.artist.musicGenres : [],
        this.isFieldRequired(EditableArtistField.MusicGenres) ?
          [Validators.required]
          : []
      ];
    }
    if (this.isFieldVisible(EditableArtistField.DanceGenres)) {
      config.danceGenres = [this.artist ? this.artist.danceGenres : [],
        this.isFieldRequired(EditableArtistField.DanceGenres) ?
          [Validators.required]
          : []
      ];
    }

    this.form = this.formBuilder.group(config);
  }

  onSubmit() {
    const result: Partial<Artist> = omit(this.form.value, cityFilterFieldName);
    this.saveClick.emit(assign({}, this.artist, result));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
