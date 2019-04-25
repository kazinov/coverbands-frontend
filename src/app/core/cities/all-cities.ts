import { Cities } from './cities.data';

export const allCities = Object.keys(Cities)
  .map((key: string) => Cities[key]);