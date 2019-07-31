import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '@core/auth/auth.service';
import { of } from 'rxjs';
import { SnackService } from '@core/snack/snack.service';
import { TRANSLATIONS } from '@core/translation/translations';
import { HttpError } from '@shared/types/http-error';
import {
  createArtistAction,
  createArtistFailureAction,
  createArtistSuccessAction
} from '@artist-admin/artist-admin.actions';

@Injectable()
export class ArtistAdminEffects {

  createArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArtistAction),
      exhaustMap(action =>
        of(0).pipe(
          map(() => {
            this.snackService.success(TRANSLATIONS.auth.userRegistered);
            return createArtistSuccessAction();
          }),
          catchError(error => {
            this.showErrorSnack(error);
            return of(createArtistFailureAction({error}));
          })
        )
      )
    )
  );

  showErrorSnack(error: HttpError) {
    this.snackService.error(TRANSLATIONS.auth.errors[error.code]);
  }

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackService: SnackService
  ) {
  }

}
