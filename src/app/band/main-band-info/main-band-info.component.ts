import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainBandInfo } from '../band.model';
import { Store } from '@ngrx/store';
import { MusicGenresModuleState } from '../../core/music-genres/music-genres.reducer';
import { Countries } from '../../core/countries/counries.model';
import { TranslationService } from '../../core/translation/translation.service';
import { allMusicGenres } from '../../core/music-genres/all-music.genres';
import { allCities } from '../../core/cities/all-cities';

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

  genres = allMusicGenres.map((genreId) => this.translationService.translateMusicGenre(genreId));
  cities = allCities.map((cityId) => this.translationService.translateCity(Countries.Russia, cityId));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MusicGenresModuleState>,
    private translationService: TranslationService
  ) {
  }

  ngOnInit() {
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
