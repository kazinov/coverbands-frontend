import { uniqueStoreKey } from '@shared/utils/unique-store-key';
import {
  FirebaseDocumentSnapshot,
  FirebaseQueryDocumentSnapshot,
  FirebaseQuerySnapshot
} from '@core/firebase/firebase.model';
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

export interface LoadArtistsParams {
  userId?: string;
}

export const ARTIST_STORE_KEY = uniqueStoreKey('artist');


export abstract class ArtistHelpers {

  static fromFirebaseQueryResults(snapshot: FirebaseQuerySnapshot): Artist[] {
    const artists = [];

    snapshot.forEach((documentSnapshot: FirebaseQueryDocumentSnapshot) => {
      artists.push(
        ArtistHelpers.firebaseDataToArtist(documentSnapshot)
      );
    });

    return artists;
  }

  static firebaseDataToArtist(snapshot: FirebaseDocumentSnapshot) {
    const data = snapshot.data();
    if (data) {
      let artist: Artist = {
        id: snapshot.id
      };

      artist = assign(artist, data);

      return artist;
    }
    return null;
  }
}
