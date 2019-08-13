import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SnackService } from '@core/snack/snack.service';
import { TRANSLATIONS } from '@core/translation/translations';
import { HttpError } from '@shared/types/http-error';
import {
  createArtistAction,
  createArtistFailureAction,
  createArtistSuccessAction, updateArtistAction, updateArtistFailureAction, updateArtistSuccessAction
} from '@artist-admin/artist-admin.actions';
import { ArtistAdminService } from '@artist-admin/artist-admin.service';
import { upsertArtistsAction } from '@core/artist/artist.actions';
import { Router } from '@angular/router';
import { AdminPaths } from '@admin/admin-paths';
import { ArtistAdminPaths } from '@artist-admin/artist-admin-paths';
import { TranslationUtils } from '@core/translation/translation.utils';

@Injectable()
export class ArtistAdminEffects {

  createArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArtistAction),
      exhaustMap(action => {
          return this.artistAdminService.createArtist(action.artist).pipe(
            switchMap((artist) => {
              this.router.navigate([
                AdminPaths.Admin,
                ArtistAdminPaths.Artist,
                ArtistAdminPaths.Edit,
                artist.id]);
              return of(
                upsertArtistsAction({artists: [artist]}),
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
          return this.artistAdminService.updateArtist(action.artist).pipe(
            switchMap(() => {
              this.snackService.success(TRANSLATIONS.changesSaved);
              return of(
                upsertArtistsAction({artists: [action.artist]}),
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

  showErrorSnack(error: HttpError, id: string) {
    this.snackService.success(
      TranslationUtils.interpolate(TRANSLATIONS.error,
        {
          id,
          code: error && error.code || 500
        })
    );
  }

  constructor(
    private actions$: Actions,
    private artistAdminService: ArtistAdminService,
    private snackService: SnackService,
    private router: Router
  ) {
  }

}