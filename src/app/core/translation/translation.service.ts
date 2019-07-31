import { Injectable } from '@angular/core';
import { TRANSLATIONS } from '@core/translation/translations';

// TODO: get rid of this
@Injectable()
export class TranslationService {
  translateCity(countryId: string, cityId: string) {
    return TRANSLATIONS.cities[countryId][cityId];
  }

  translateMusicGenre(genreId: string) {
    return TRANSLATIONS.musicGenres[genreId];
  }

}
