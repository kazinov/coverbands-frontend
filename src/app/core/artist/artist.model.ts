import { Currencies } from '../currencies/currencies.model';
import { ArtistTypes } from '@core/artist-types/artist-types.model';

export interface CoverInfo {
  band: string,
  song: string
}

export interface Link {
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
  type?: ArtistTypes;
  name?: string;
  description?: string;
  city?: string;
  genres?: string[];
  covers?: CoverInfo[];
  links?: Link[];
  profileImage?: string;
  profileImageThumb?: string;
  images?: string[];
  email?: string;
  phoneCode?: string
  phoneNumber?: string;
  oneShowPrice?: Price;
  prices?: Price[];
}