import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SnackService } from '@core/snack/snack.service';
import { TRANSLATIONS } from '@core/translation/translations';
import { HttpError } from '@shared/types/http-error';
import { Router } from '@angular/router';
import { AdminPaths } from '@admin/admin-paths';
import { ArtistAdminPaths } from '@artist-admin/artist-admin-paths';
import { TranslationUtils } from '@core/translation/translation.utils';
import { ArtistService } from '@core/artist/artist.service';
import {
  createArtistAction,
  createArtistFailureAction,
  createArtistSuccessAction, deleteArtistImageAction, deleteArtistImageFailureAction, deleteArtistImageSuccessAction,
  deleteArtistProfileImageAction,
  deleteArtistProfileImageFailureAction,
  deleteArtistProfileImageSuccessAction,
  loadArtistAction,
  loadArtistFailureAction,
  loadArtistSuccessAction,
  updateArtistAction,
  updateArtistFailureAction,
  updateArtistSuccessAction, uploadArtistImageAction, uploadArtistImageFailureAction, uploadArtistImageSuccessAction,
  replaceArtistProfileImageAction,
  replaceArtistProfileImageFailureAction,
  replaceArtistProfileImageSuccessAction,
  upsertArtistsToStoreAction
} from '@core/artist/artist.actions';
import { Artist } from '@core/artist/artist.model';

@Injectable()
export class ArtistEffects {

  createArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArtistAction),
      exhaustMap(action => {
          return this.artistService.createArtist(action.artist).pipe(
            switchMap((artist) => {
              this.router.navigate([
                AdminPaths.Admin,
                ArtistAdminPaths.Artist,
                ArtistAdminPaths.Edit,
                artist.id]);
              return of(
                upsertArtistsToStoreAction({artists: [artist]}),
                createArtistSuccessAction()
              );
            }),
            catchError(error => {
              this.showErrorSnack(error, 'create-artist');
              return of(createArtistFailureAction({error}));
            })
          );
        }
      )
    )
  );

  updateArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArtistAction),
      exhaustMap(action => {
          return this.artistService.updateArtist(action.artist).pipe(
            switchMap(() => {
              this.snackService.success(TRANSLATIONS.changesSaved);
              return of(
                upsertArtistsToStoreAction({artists: [action.artist]}),
                updateArtistSuccessAction()
              );
            }),
            catchError(error => {
              this.showErrorSnack(error, 'update-artist');
              return of(updateArtistFailureAction({error}));
            })
          );
        }
      )
    )
  );

  loadArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArtistAction),
      exhaustMap(action => {
          return this.artistService.loadArtist(action.id).pipe(
            switchMap((artist: Artist) => {
              return of(
                upsertArtistsToStoreAction({artists: [artist]}),
                loadArtistSuccessAction()
              );
            }),
            catchError(error => {
              this.showErrorSnack(error, 'load-artist');
              return of(loadArtistFailureAction({error}));
            })
          );
        }
      )
    )
  );

  replaceArtistProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(replaceArtistProfileImageAction),
      exhaustMap(action => {
          return this.artistService.replaceArtistProfileImage(
            action.artist,
            action.image,
            action.thumb
          ).pipe(
            switchMap((artist: Artist) => {
              this.snackService.success(TRANSLATIONS.changesSaved);
              return of(
                upsertArtistsToStoreAction({artists: [artist]}),
                replaceArtistProfileImageSuccessAction()
              );
            }),
            catchError(error => {
              this.showErrorSnack(error, 'upload-artist-profile-image');
              return of(replaceArtistProfileImageFailureAction({error}));
            })
          );
        }
      )
    )
  );

  deleteArtistProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArtistProfileImageAction),
      exhaustMap(action => {
          return this.artistService.deleteArtistProfileImage(action.artist).pipe(
            switchMap((artist: Artist) => {
              this.snackService.success(TRANSLATIONS.changesSaved);
              return of(
                upsertArtistsToStoreAction({artists: [artist]}),
                deleteArtistProfileImageSuccessAction()
              );
            }),
            catchError(error => {
              this.showErrorSnack(error, 'delete-artist-profile-image');
              return of(deleteArtistProfileImageFailureAction({error}));
            })
          );
        }
      )
    )
  );

  uploadArtistImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadArtistImageAction),
      exhaustMap(action => {
          return this.artistService.uploadArtistImage(
            action.artist,
            action.image
          ).pipe(
            switchMap((artist: Artist) => {
              this.snackService.success(TRANSLATIONS.changesSaved);
              return of(
                upsertArtistsToStoreAction({artists: [artist]}),
                uploadArtistImageSuccessAction()
              );
            }),
            catchError(error => {
              this.showErrorSnack(error, 'upload-artist-image');
              return of(uploadArtistImageFailureAction({error}));
            })
          );
        }
      )
    )
  );

  deleteArtistImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArtistImageAction),
      exhaustMap(action => {
          return this.artistService.deleteArtistImage(
            action.artist,
            action.imagePath
            ).pipe(
            switchMap((artist: Artist) => {
              this.snackService.success(TRANSLATIONS.changesSaved);
              return of(
                upsertArtistsToStoreAction({artists: [artist]}),
                deleteArtistImageSuccessAction()
              );
            }),
            catchError(error => {
              this.showErrorSnack(error, 'delete-artist-image');
              return of(deleteArtistImageFailureAction({error}));
            })
          );
        }
      )
    )
  );

  showErrorSnack(error: HttpError, id: string) {
    this.snackService.error(
      TranslationUtils.interpolate(TRANSLATIONS.error,
        {
          id,
          code: error && error.code || 500
        })
    );
  }

  constructor(
    private actions$: Actions,
    private artistService: ArtistService,
    private snackService: SnackService,
    private router: Router
  ) {
  }

}
