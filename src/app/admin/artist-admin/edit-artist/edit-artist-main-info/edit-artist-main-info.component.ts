import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import omit from 'lodash-es/omit';
import assign from 'lodash-es/assign';
import { SelectorOption } from '@shared/utils/selector-option';
import { TranslationService } from '@core/translation/translation.service';
import { Artist } from '@core/artist/artist.model';
import { ArtistTypes } from '@core/models/artist-types.model';
import { ALL_MUSIC_GENRES } from '@core/models/music-genres.model';
import { ALL_RUSSIAN_CITIES } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';
import { TRANSLATIONS } from '@core/translation/translations';

const cityFilterFieldName = 'cityFilter';

@Component({
  selector: 'app-edit-artist-main-info',
  templateUrl: './edit-artist-main-info.component.html',
  styleUrls: ['./edit-artist-main-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistMainInfoComponent implements OnInit, OnDestroy {
  @Input() saveButtonText = 'Сохранить';
  @Input() artist: Artist;
  @Input() hideDescription: boolean;
  @Output() saveClick = new EventEmitter<Artist>();
  form: FormGroup;
  t = TRANSLATIONS;

  genres: SelectorOption[]
    = ALL_MUSIC_GENRES.map((genreId) => ({
    id: genreId,
    label: this.translationService.translateMusicGenre(genreId)
  }));

  cities: SelectorOption[]
    = ALL_RUSSIAN_CITIES.map((cityId) => ({
    id: cityId,
    label: this.translationService.translateCity(Countries.Russia, cityId)
  }));

  filteredCities: SelectorOption[] = this.cities.slice();
  onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslationService
  ) {
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
    this.form = this.formBuilder.group({
      name: [this.artist ? this.artist.name : null, [Validators.required]],
      description: [this.artist ? this.artist.description : null, []],
      [cityFilterFieldName]: [null, []],
      city: [this.artist ? this.artist.city : null, [Validators.required]],
      genres: [this.artist ? this.artist.musicGenres : [], [Validators.required]]
    });
  }

  onSubmit() {
    const result: Partial<Artist> = omit(this.form.value, cityFilterFieldName);
    result.type = ArtistTypes.LiveMusic;
    this.saveClick.emit(assign({}, this.artist, result));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
