import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseService } from '@core/firebase/firebase.service';
import { Artist } from '@core/artist/artist.model';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromFirebaseError } from '@core/firebase/util/from-firebase-error';
import { FirebaseDocumentReference } from '@core/firebase/firebase.model';
import { AuthService } from '@core/auth/auth.service';

const ARTISTS_COLLECTION_NAME = 'artists';

@Injectable()
export class ArtistAdminService {
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
            ...newArtist,
            createdAt: this.firebaseService.serverTimestampType
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

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
  }
}
