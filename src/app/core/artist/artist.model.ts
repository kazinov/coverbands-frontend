import { uniqueStoreKey } from '@shared/utils/unique-store-key';
import { FirebaseDocumentData, FirebaseDocumentSnapshot } from '@core/firebase/firebase.model';
import assign from 'lodash-es/assign';

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
  type?: string;
  published?: boolean;
  onboardingStepPassed?: string;
  name?: string;
  description?: string;
  city?: string;
  musicGenres?: string[];
  danceGenres?: string[];
  covers?: CoverInfo[];
  links?: Link[];
  videos?: string[];
  profileImage?: string;
  profileImageThumb?: string;
  images?: string[];
  email?: string;
  phoneCode?: string;
  contactsComment?: string;
  phoneNumber?: string;
  oneShowPrice?: Price;
  prices?: Price[];
}

export const ARTIST_STORE_KEY = uniqueStoreKey('artist');


export abstract class ArtistHelpers {
  static fromFirebaseDocument(data: FirebaseDocumentSnapshot): Artist {
    const stapshot: FirebaseDocumentData = data.data();

    if (stapshot) {
      let artist: Artist = {
        id: data.id
      };

      artist = assign(artist, stapshot);

      return artist;
    }
    return null;
  }
}
