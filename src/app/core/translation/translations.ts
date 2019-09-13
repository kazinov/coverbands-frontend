import { MusicGenres } from '@core/models/music-genres.model';
import { Cities } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';
import { AUTH_MENU_TRANSLATIONS } from '../../layout/navbar/auth/auth.translations';
import { SNACK_TRANSLATIONS } from '@core/snack/snack.translations';
import { AUTH_TRANSLATIONS } from '@core/auth/auth.translations';
import { RESET_PASSWORD_DIALOG_TRANSLATIONS } from '@core/auth/auth-components/reset-password-dialog/reset-password-dialog.translations';
import { ArtistTypes } from '@core/models/artist-types.model';
import { CREATE_ARTIST_TRANSLATIONS } from '@artist-admin/create-artist/create-artist.translations';
import { EDIT_ARTIST_TRANSLATIONS } from '@artist-admin/edit-artist/edit-artist/edit-artist.translations';
import { DanceGenres } from '@core/models/dance-genres.model';
import { ARTIST_LIST_TRANSLATIONS } from '@artist-admin/artist-list/artist-list.translations';

export const TRANSLATIONS = {
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
  danceGenres: {
    [DanceGenres.HipHop]: 'Хип-хоп',
    [DanceGenres.Russian]: 'Русские народные',
    [DanceGenres.Ballroom]: 'Бальные',
  },
  artistTypes: {
    [ArtistTypes.LiveMusic]: 'Живая музыка',
    [ArtistTypes.DanceShow]: 'Танцы',
    [ArtistTypes.DJ]: 'Диджей',
    [ArtistTypes.MC]: 'Ведущий',
    [ArtistTypes.Other]: 'Другое',
    [ArtistTypes.StandUp]: 'Стендап',
  },
  forms: {
    validationMessages: {
      requiredField: 'Обязательное поле',
      passwordTooShort: 'Пароль должен содержать как минимум {length} символов',
      passwordTooLong: 'Пароль должен содержать как минимум {length} символов'
    }
  },
  error: 'Ошибка {id}:{code}',
  changesSaved: 'Изменения сохранены',
  ...AUTH_MENU_TRANSLATIONS,
  ...SNACK_TRANSLATIONS,
  ...AUTH_TRANSLATIONS,
  ...RESET_PASSWORD_DIALOG_TRANSLATIONS,
  ...CREATE_ARTIST_TRANSLATIONS,
  ...EDIT_ARTIST_TRANSLATIONS,
  ...ARTIST_LIST_TRANSLATIONS
};

