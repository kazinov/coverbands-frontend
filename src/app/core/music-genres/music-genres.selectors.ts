import { createFeatureSelector, createSelector } from '@ngrx/store';
import { musicGenresFeatureName } from './music-genres.reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class MusicGenresSelectors {
  selectGenres = createFeatureSelector<string[]>(musicGenresFeatureName);
  areGenresLoaded = createSelector(
    this.selectGenres,
    (genres) => genres && !!genres.length);
}
