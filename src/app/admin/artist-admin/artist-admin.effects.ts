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
  createArtistSuccessAction
} from '@artist-admin/artist-admin.actions';
import { ArtistAdminService } from '@artist-admin/artist-admin.service';
import { upsertArtistsAction } from '@core/artist/artist.actions';
import { Router } from '@angular/router';
import { AdminPaths } from '@admin/admin-paths';
import { ArtistAdminPaths } from '@artist-admin/artist-admin-paths';

@Injectable()
export class ArtistAdminEffects {

  createArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArtistAction),
      exhaustMap(action => {
          return this.artistAdminService.createArtist(action.artist).pipe(
            switchMap((artist) => {
              this.snackService.success(TRANSLATIONS.auth.userRegistered);
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
              this.showErrorSnack(error);
              return of(createArtistFailureAction({error}));
            })
          );
        }
      )
    )
  );

  showErrorSnack(error: HttpError) {
    this.snackService.error(TRANSLATIONS.auth.errors[error.code]);
  }

  constructor(
    private actions$: Actions,
    private artistAdminService: ArtistAdminService,
    private snackService: SnackService,
    private router: Router
  ) {
  }

}
