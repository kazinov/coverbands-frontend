import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
  setCurrentUserAction,
  signInAction,
  signInFailureAction,
  signInSuccessAction,
  signOutAction,
  signOutFailureAction,
  signOutSuccessAction
} from '@core/auth/auth.actions';
import { FirebaseUserCredentials, FirebaseUserInfo } from '@core/firebase/firebase.model';
import { AuthService } from '@core/auth/auth.service';
import { of } from 'rxjs';
import { AppUserInfoHelpers } from '@core/auth/auth.model';
import { SnackService } from '@core/snack/snack.service';
import { TRANSLATIONS } from '@core/translation/translations';
import { HttpError } from '@shared/types/http-error';

@Injectable()
export class AuthEffects {

  authChange$ = createEffect(() => {
      return this.authService.authStateChanged$
        .pipe(
          map((user: FirebaseUserInfo) => setCurrentUserAction({
            user: AppUserInfoHelpers.fromFirebaseUserInfo(user)
          })),
          tap((val) => console.error('current user', val))
        );
    }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      exhaustMap(action =>
        this.authService.register(action.credentials).pipe(
          map((credentials: FirebaseUserCredentials) => registerSuccessAction({credentials})),
          catchError(error => {
            this.showErrorSnack(error);
            return of(registerFailureAction({error}));
          })
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInAction),
      exhaustMap(action =>
        this.authService.signIn(action.email, action.password).pipe(
          map((credentials) => signInSuccessAction({credentials})),
          catchError(error => {
            this.showErrorSnack(error);
            return of(signInFailureAction({error}));
          })
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOutAction),
      exhaustMap(action =>
        this.authService.signOut().pipe(
          map(() => signOutSuccessAction()),
          catchError(error => {
            this.showErrorSnack(error);
            return of(signOutFailureAction({error}));
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
