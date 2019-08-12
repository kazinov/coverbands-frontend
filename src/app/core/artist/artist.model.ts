import { uniqueStoreKey } from '@shared/utils/unique-store-key';

export interface CoverInfo {
  band: string;
  song: string;
}

export interface Link {
  link: string;
  description: string;
}

export interface Price {
  value: number;
  currency: string;
  service: string;
}

export interface Artist {
  id: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  type?: string;
  name?: string;
  description?: string;
  city?: string;
  musicGenres?: string[];
  covers?: CoverInfo[];
  links?: Link[];
  videos?: string[];
  profileImage?: string;
  profileImageThumb?: string;
  images?: string[];
  email?: string;
  phoneCode?: string;
  phoneNumber?: string;
  oneShowPrice?: Price;
  prices?: Price[];
}

export const ARTIST_STORE_KEY = uniqueStoreKey('artist');
