import { Currencies } from '../currencies/currencies.model';

export interface CoverInfo {
  band: string,
  song: string
}

export interface BandLink {
  link: string,
  description: string
}

export interface Price {
  value: number;
  currency: Currencies;
  service: string;
}

export interface Artist {
  id?: string;
  name?: string;
  description?: string;
  city?: string;
  genres?: string[];
  covers?: CoverInfo[];
  links?: BandLink[];
  profileImage?: string;
  profileImageThumb?: string;
  images?: string[];
  email?: string;
  phoneCode?: string
  phoneNumber?: string;
  oneShowPrice?: Price;
  prices?: Price[];
}