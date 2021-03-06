import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseService } from '@core/firebase/firebase.service';
import { Artist, ArtistHelpers, LoadArtistsParams } from '@core/artist/artist.model';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { fromFirebaseError } from '@core/firebase/util/from-firebase-error';
import {
  FirebaseDocumentReference,
  FirebaseDocumentSnapshot,
  FirebaseQuery,
  FirebaseQuerySnapshot,
  FirebaseUploadTaskSnapshot
} from '@core/firebase/firebase.model';
import { AuthService } from '@core/auth/auth.service';
import { generateUUID } from '@shared/utils/generate-uid';
import isNil from 'lodash-es/isNil';

const ARTISTS_COLLECTION_NAME = 'artists';

enum ArtistImageType {
  Profile = 'profile',
  ProfileThumb = 'profile_thumb',
  Image = 'image'
}

function getArtistImagePath(artistId: string, imageType: ArtistImageType) {
  return `artist_images/${artistId}_${imageType}_${generateUUID()}`;
}

@Injectable()
export class ArtistService {
  private artistsCollection = this.firebaseService.firestore.collection(ARTISTS_COLLECTION_NAME);

  createArtist(artist: Partial<Artist>): Observable<Artist> {
    return this.authService.getCurrentUserId()
      .pipe(
        withLatestFrom(this.authService.getCurrentUserEmail()),
        switchMap(([userId, userEmail]) => {
          const newArtist = {
            ...artist,
            userId,
            email: userEmail
          };

          return from(this.artistsCollection.add({
            ...newArtist
          }))
            .pipe(
              map((ref: FirebaseDocumentReference) => {
                return {
                  ...newArtist,
                  id: ref.id
                };
              }),
              catchError(fromFirebaseError)
            );
        })
      );
  }

  updateArtist(artist: Artist): Observable<void> {
    return from(this.artistsCollection.doc(artist.id).update({
      ...artist
    }))
      .pipe(
        catchError(fromFirebaseError)
      );
  }

  loadArtist(id: string): Observable<Artist> {
    return from(this.artistsCollection.doc(id).get({
      source: 'server'
    }))
      .pipe(
        switchMap((snapshot: FirebaseDocumentSnapshot) => {
            const artist = ArtistHelpers.firebaseDataToArtist(snapshot);
            if (!artist) {
              return throwError({
                code: 'artist-not-found'
              });
            }

            return of(artist);
          }
        ),
        catchError(fromFirebaseError)
      );
  }

  replaceArtistProfileImage(artist: Artist, image: File, thumb: File): Observable<Artist> {
    return this.deleteArtistProfileImage(artist)
      .pipe(
        switchMap(() => this.uploadArtistProfileImage(artist, image, thumb))
      );
  }

  uploadArtistProfileImage(artist: Artist, image: File, thumb: File): Observable<Artist> {
    const profileImageRef = this.firebaseService.storageRef.child(getArtistImagePath(
      artist.id, ArtistImageType.Profile
    ));
    const profileThumbRef = this.firebaseService.storageRef.child(getArtistImagePath(
      artist.id, ArtistImageType.ProfileThumb
    ));

    return forkJoin([
        from(profileImageRef.put(image)),
        from(profileThumbRef.put(thumb))
      ]
    )
      .pipe(
        switchMap(([imageSnapshot, thumbShapshot]: [FirebaseUploadTaskSnapshot, FirebaseUploadTaskSnapshot]) => {
          const updatedArtist = {
            ...artist,
            profileImage: profileImageRef.fullPath,
            profileImageThumb: profileThumbRef.fullPath
          };
          return this.updateArtist(updatedArtist)
            .pipe(map(() => updatedArtist));
        }),
        catchError(fromFirebaseError)
      );
  }

  deleteArtistProfileImage(artist: Artist): Observable<Artist> {
    const profileImageDelete = artist.profileImage
      ? from(this.firebaseService.storageRef.child(artist.profileImage).delete())
      : of(1);
    const profileThumbDelete = artist.profileImageThumb
      ? from(this.firebaseService.storageRef.child(artist.profileImageThumb).delete())
      : of(1);

    return forkJoin([
        profileImageDelete,
        profileThumbDelete
      ]
    )
      .pipe(
        switchMap(() => {
          const updatedArtist = {
            ...artist
          };
          updatedArtist.profileImage = null;
          updatedArtist.profileImageThumb = null;

          const noChanges = isNil(artist.profileImage)
            && isNil(artist.profileImageThumb)
            && isNil(updatedArtist.profileImage)
            && isNil(updatedArtist.profileImageThumb);

          return noChanges ? of(updatedArtist) : this.updateArtist(updatedArtist)
            .pipe(map(() => updatedArtist));
        }),
        catchError(fromFirebaseError)
      );
  }

  uploadArtistImage(artist: Artist, image: File): Observable<Artist> {
    const imageRef = this.firebaseService.storageRef.child(getArtistImagePath(
      artist.id, ArtistImageType.Image
    ));

    return from(imageRef.put(image))
      .pipe(
        switchMap((imageSnapshot: FirebaseUploadTaskSnapshot) => {
          const updatedArtist = {
            ...artist,
            images: [
              ...(artist.images || []),
              imageRef.fullPath
            ]
          };
          return this.updateArtist(updatedArtist)
            .pipe(map(() => updatedArtist));
        }),
        catchError(fromFirebaseError)
      );
  }

  deleteArtistImage(artist: Artist, imagePath: string): Observable<Artist> {
    return from(this.firebaseService.storageRef.child(imagePath).delete())
      .pipe(
        switchMap(() => {
          const updatedArtist = {
            ...artist,
            images: [
              ...(artist.images || [])
                .filter((path) => path !== imagePath)
            ]
          };

          return this.updateArtist(updatedArtist)
            .pipe(map(() => updatedArtist));
        }),
        catchError(fromFirebaseError)
      );
  }

  loadArtists(params: LoadArtistsParams): Observable<Artist[]> {
    let query: FirebaseQuery;
    if (params.userId) {
      query = this.artistsCollection.where('userId', '==', params.userId);
    }

    if (!query) {
      return throwError('There should be params to load artists');
    }
    const config = {source: 'server'} as any;

    return from(query.get(config))
      .pipe(
        map((snapshot: FirebaseQuerySnapshot) => {
          return ArtistHelpers.fromFirebaseQueryResults(snapshot);
        }),
        catchError(fromFirebaseError)
      );
  }

  deleteArtist(id: string): Observable<void> {
    return from(this.artistsCollection.doc(id).delete())
      .pipe(catchError(fromFirebaseError));
  }

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
  }
}
