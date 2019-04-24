import { createFeatureSelector } from '@ngrx/store';
import { musicGenresFeatureName, MusicGenresModuleState } from './music-genres.reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class MusicGenresSelectors {
  selectGenres = createFeatureSelector<string[]>(musicGenresFeatureName);
}
