import { Countries } from '@core/models/counries.model';
import { MusicGenres } from '@core/models/music-genres.model';
import { Cities } from '@core/models/cities.model';

export const TranslationsRu = {
  cities: {
    [Countries.Russia]: {
      [Cities.Kazan]: 'Казань',
      [Cities.Krasnodar]: 'Краснодар',
      [Cities.Moscow]: 'Москва',
      [Cities.SaintPetersburg]: 'Санкт-Петербург',
      [Cities.Yaroslavl]: 'Ярославль'
    }
  },
  musicGenres: {
    [MusicGenres.Funk]: 'Фанк',
    [MusicGenres.Jazz]: 'Джаз',
    [MusicGenres.Pop]: 'Поп',
    [MusicGenres.Rap]: 'Реп',
    [MusicGenres.Rock]: 'Рок',
  }
};
