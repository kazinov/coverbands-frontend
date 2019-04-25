import { Countries } from '../countries/counries.model';
import { Cities } from '../cities/cities.data';
import { MusicGenres } from '../music-genres/music-genres.data';

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