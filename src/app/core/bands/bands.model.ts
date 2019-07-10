import { BandPrices } from '../../band/band-prices/band-prices.model';

export interface CoverInfo {
  band: string,
  song: string
}

export interface BandLink {
  link: string,
  description: string
}

export interface Artist
  extends BandPrices {
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
}