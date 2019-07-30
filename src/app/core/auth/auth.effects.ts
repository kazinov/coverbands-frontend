import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  logoutAction, logoutFailureAction, logoutSuccessAction,
  registerAction,
  registerFailureAction,
  registerSuccessAction,
  setCurrentUserAction
} from '@core/auth/auth.actions';
import { FirebaseUserCredentials, FirebaseUserInfo } from '@core/firebase/firebase.model';
import { AuthService } from '@core/auth/auth.service';
import { of } from 'rxjs';
import { AppUserInfoHelpers } from '@core/auth/auth.model';

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
          map((credentials: FirebaseUserCredentials) => registerSuccessAction({ credentials })),
          catchError(error => {
            console.error('register failure', error)
            return of(registerFailureAction({ error }));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      exhaustMap(action =>
        this.authService.logout().pipe(
          tap(() => console.error('logout success')),
          map(() => logoutSuccessAction()),
          catchError(error => {
            console.error('logout failure', error)
            return of(logoutFailureAction({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

}
