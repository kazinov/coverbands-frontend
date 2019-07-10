import { Countries } from '@core/models/countries.model';

export const Cities = {
  [Countries.Russia]: {
    SaintPetersburg: 'saint-petersburg',
    Moscow: 'moscow',
    Kazan: 'kazan',
    Krasnodar: 'krasnodar',
    Yaroslavl: 'yaroslavl'
  }
};

export const ALL_RUSSIAN_CITIES = Object.keys(Cities[Countries.Russia])
  .map((key: string) => Cities[Countries.Russia][key]);
