import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import omit from 'lodash-es/omit';
import { SelectorOption } from '../../shared/utils/selector-option';
import { allCities } from '../../core/cities/all-cities';
import { Countries } from '../../core/countries/counries.model';
import { TranslationService } from '../../core/translation/translation.service';
import { allMusicGenres } from '../../core/music-genres/all-music.genres';
import { Artist } from '../../core/bands/bands.model';

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
  @Output() saveClick = new EventEmitter<Partial<Artist>>();
  form: FormGroup;

  genres: SelectorOption[]
    = allMusicGenres.map((genreId) => ({
    id: genreId,
    label: this.translationService.translateMusicGenre(genreId)
  }));

  cities: SelectorOption[]
    = allCities.map((cityId) => ({
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
      genres: [this.artist ? this.artist.genres : [], [Validators.required]]
    });
  }

  onSubmit() {
    this.saveClick.emit(omit(this.form.value, cityFilterFieldName));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
