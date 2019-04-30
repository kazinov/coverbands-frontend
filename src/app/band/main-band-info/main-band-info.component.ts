import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MusicGenresModuleState } from '../../core/music-genres/music-genres.reducer';
import { Countries } from '../../core/countries/counries.model';
import { TranslationService } from '../../core/translation/translation.service';
import { allMusicGenres } from '../../core/music-genres/all-music.genres';
import { allCities } from '../../core/cities/all-cities';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import omit from 'lodash-es/omit';
import { SelectorOption } from '../../shared/utils/selector-option';
import { MainBandInfo } from '../main-band-info.model';

const cityFilterFieldName = 'cityFilter';

@Component({
  selector: 'app-main-band-info',
  templateUrl: './main-band-info.component.html',
  styleUrls: ['./main-band-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBandInfoComponent implements OnInit, OnDestroy {
  @Input() saveButtonText = 'Сохранить';
  @Input() info: MainBandInfo;
  @Output() saveClick = new EventEmitter<MainBandInfo>();
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
    private store: Store<MusicGenresModuleState>,
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
      name: [this.info ? this.info.name : null, [Validators.required]],
      description: [this.info ? this.info.description : null, []],
      [cityFilterFieldName]: [null, []],
      city: [this.info ? this.info.city : null, [Validators.required]],
      genres: [this.info ? this.info.genres : [], [Validators.required]]
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
