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
          tap((val) => console.error('register success', val)),
          map((credentials: FirebaseUserCredentials) => registerSuccessAction({credentials})),
          catchError(error => {
            console.error('register failure', error)
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
        this.authService.login(action.email, action.password).pipe(
          tap((val) => console.error('login success', val)),
          map((credentials) => signInSuccessAction({credentials})),
          catchError(error => {
            this.snackService.error(TRANSLATIONS.auth.errors[error.code]);
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
        this.authService.logout().pipe(
          tap(() => console.error('logout success')),
          map(() => signOutSuccessAction()),
          catchError(error => {
            console.error('logout failure', error)
            return of(signOutFailureAction({error}));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackService: SnackService
  ) {
  }

}
