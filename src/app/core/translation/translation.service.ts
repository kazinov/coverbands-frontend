import { Injectable } from '@angular/core';
import { TranslationsRu } from './translation.data';

@Injectable()
export class TranslationService {
  translateCity(countryId: string, cityId: string) {
    return TranslationsRu.cities[countryId][cityId];
  }

  translateMusicGenre(genreId: string) {
    return TranslationsRu.musicGenres[genreId];
  }

}
