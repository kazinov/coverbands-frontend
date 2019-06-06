import { Currencies } from '../../core/currencies/currencies.model';

export interface Price {
  value: number;
  currency: Currencies;
  service: string;
}

export interface BandPrices {
  oneShowPrice?: Price;
  prices?: Price[];
}