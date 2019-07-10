import { MusicGenres } from '@core/models/music-genres.model';
import { Cities } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';
import { VideoProviders } from '@core/models/video-providers.model';

export const TranslationsRu = {
  cities: {
    [Countries.Russia]: {
      [Cities[Countries.Russia].Kazan]: 'Казань',
      [Cities[Countries.Russia].Krasnodar]: 'Краснодар',
      [Cities[Countries.Russia].Moscow]: 'Москва',
      [Cities[Countries.Russia].SaintPetersburg]: 'Санкт-Петербург',
      [Cities[Countries.Russia].Yaroslavl]: 'Ярославль'
    }
  },
  musicGenres: {
    [MusicGenres.Funk]: 'Фанк',
    [MusicGenres.Jazz]: 'Джаз',
    [MusicGenres.Pop]: 'Поп',
    [MusicGenres.Rap]: 'Реп',
    [MusicGenres.Rock]: 'Рок',
  },
  videoProviders: {
    [VideoProviders.Youtube]: 'Youtube',
    [VideoProviders.Vk]: 'ВКонтакте'
  }
};
