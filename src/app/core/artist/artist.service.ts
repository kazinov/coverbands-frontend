import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseService } from '@core/firebase/firebase.service';
import { Artist, ArtistHelpers } from '@core/artist/artist.model';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromFirebaseError } from '@core/firebase/util/from-firebase-error';
import {
  FirebaseDocumentReference,
  FirebaseDocumentSnapshot,
  FirebaseUploadTaskSnapshot
} from '@core/firebase/firebase.model';
import { AuthService } from '@core/auth/auth.service';

const ARTISTS_COLLECTION_NAME = 'artists';

enum ArtistImageType {
  Profile = 'profile',
  ProfileThumb = 'profile_thumb',
  Image = 'image'
}

function getArtistImagePath(artistId: string, imageType: ArtistImageType) {
  return `artist_images/${artistId}_${imageType}`;
}

@Injectable()
export class ArtistService {
  private artistsCollection = this.firebaseService.firestore.collection(ARTISTS_COLLECTION_NAME);

  createArtist(artist: Partial<Artist>): Observable<Artist> {
    return this.authService.getCurrentUserId()
      .pipe(
        switchMap((userId: string) => {
          const newArtist = {
            ...artist,
            userId
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
        map((snapshot: FirebaseDocumentSnapshot) =>
          ArtistHelpers.fromFirebaseDocument(snapshot)
        ),
        catchError(fromFirebaseError)
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
          return forkJoin([
            from(imageSnapshot.ref.getDownloadURL()),
            from(thumbShapshot.ref.getDownloadURL()),
          ]);
        }),
        switchMap(([imageUrl, thumbUrl]: [string, string]) => {
          const updatedArtist = {
            ...artist,
            profileImage: imageUrl,
            profileImageThumb: thumbUrl
          };
          return this.updateArtist(updatedArtist)
            .pipe(map(() => updatedArtist));
        }),
        catchError(fromFirebaseError)
      );
  }


  deleteArtistProfileImage(artist: Artist): Observable<Artist> {
    const profileImageDelete = artist.profileImage
    ? from(this.firebaseService.storage.refFromURL(artist.profileImage).delete())
    : of(1);
    const profileThumbDelete = artist.profileImageThumb
      ? from(this.firebaseService.storage.refFromURL(artist.profileImageThumb).delete())
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

          return this.updateArtist(updatedArtist)
            .pipe(map(() => updatedArtist));
        }),
        catchError(fromFirebaseError)
      );
  }

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
  }
}
