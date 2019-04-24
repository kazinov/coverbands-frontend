import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainBandInfo } from '../band.model';
import { select, Store } from '@ngrx/store';
import { MusicGenresModuleState } from '../../core/music-genres/music-genres.reducer';
import { loadMusicGenresAction } from '../../core/music-genres/music-genres.actions';
import { MusicGenresSelectors } from '../../core/music-genres/music-genres.selectors';
import { loadCitiesAction } from '../../core/cities/cities.actions';
import { Countries } from '../../core/countries/counries.model';
import { CitiesSelectors } from '../../core/cities/cities.selectors';

@Component({
  selector: 'app-main-band-info',
  templateUrl: './main-band-info.component.html',
  styleUrls: ['./main-band-info.component.scss']
})
export class MainBandInfoComponent implements OnInit {
  @Input() saveButtonText = 'Save';
  @Input() info: MainBandInfo;
  @Output() saveClick = new EventEmitter<MainBandInfo>();
  form: FormGroup;

  genres$ = this.store.pipe(select(this.musicGenresSelectors.selectGenres));
  cities$ = this.store.pipe(select(this.citiesSelectors.citiesForCountrySelectorFactory(Countries.Russia)));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MusicGenresModuleState>,
    private musicGenresSelectors: MusicGenresSelectors,
    private citiesSelectors: CitiesSelectors
  ) {
  }

  ngOnInit() {
    this.store.dispatch(loadMusicGenresAction());
    this.store.dispatch(loadCitiesAction({countryId: Countries.Russia}));
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.info ? this.info.name : null, [Validators.required]],
      description: [this.info ? this.info.description : null, []],
      city: [this.info ? this.info.city : null, [Validators.required]],
      genres: [this.info ? this.info.genres : [], [Validators.required]]
    });
  }

  onSubmit() {
    this.saveClick.emit(this.form.value);
  }
}
