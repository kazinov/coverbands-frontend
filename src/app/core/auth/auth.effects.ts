import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  confirmResetPasswordAction,
  confirmResetPasswordFailureAction,
  confirmResetPasswordSuccessAction,
  registerAction,
  registerFailureAction,
  registerSuccessAction,
  sendResetPasswordAction,
  sendResetPasswordFailureAction,
  sendResetPasswordSuccessAction,
  setCurrentUserAction,
  signInAction,
  signInFailureAction,
  signInSuccessAction,
  signOutAction,
  signOutFailureAction,
  signOutSuccessAction
} from '@core/auth/auth.actions';
import { FirebaseUserInfo } from '@core/firebase/firebase.model';
import { AuthService } from '@core/auth/auth.service';
import { of } from 'rxjs';
import { AppUserInfoHelpers } from '@core/auth/auth.model';
import { SnackService } from '@core/snack/snack.service';
import { TRANSLATIONS } from '@core/translation/translations';
import { HttpError } from '@shared/types/http-error';
import { Router } from '@angular/router';
import { AppPaths } from '../../app-paths';
import { TranslationUtils } from '@core/translation/translation.utils';
import { RoutingUtils } from '@shared/utils/routing.utils';
import { ADMIN_PART_ROUTE_ID } from '@admin/admin-paths';

@Injectable()
export class AuthEffects {

  authChange$ = createEffect(() => {
      return this.authService.authStateChanged$
        .pipe(
          map((user: FirebaseUserInfo) => {
            if (!user && RoutingUtils.hasRouteId(this.router, ADMIN_PART_ROUTE_ID)) {
              this.router.navigate([AppPaths.Home]);
            }

            return setCurrentUserAction({
              user: AppUserInfoHelpers.fromFirebaseUserInfo(user)
            });
          })
        );
    }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      exhaustMap(action =>
        this.authService.register(action.credentials).pipe(
          map(() => {
            this.snackService.success(TRANSLATIONS.auth.userRegistered);
            this.authService.closeAuthDialog();
            return registerSuccessAction();
          }),
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
          map(() => {
            this.authService.closeAuthDialog();
            return signInSuccessAction();
          }),
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

  sendResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendResetPasswordAction),
      exhaustMap(action =>
        this.authService.sendResetPassword(action.email).pipe(
          map(() => {
            this.snackService.success(
              TranslationUtils.interpolate(TRANSLATIONS.auth.resetPasswordSent,
                {
                  email: action.email
                })
            );
            return sendResetPasswordSuccessAction();
          }),
          catchError(error => {
            this.showErrorSnack(error);
            return of(sendResetPasswordFailureAction({error}));
          })
        )
      )
    )
  );

  confirmResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmResetPasswordAction),
      exhaustMap(action =>
        this.authService.confirmResetPassword(action.code, action.password).pipe(
          map(() => {
            this.snackService.success(TRANSLATIONS.auth.passwordChanged);
            this.closeResetPasswordDialog();
            this.authService.openAuthDialog();
            return confirmResetPasswordSuccessAction();
          }),
          catchError((error: HttpError) => {
            this.showErrorSnack(error);
            if (error.code !== 'auth/weak-password') {
              this.closeResetPasswordDialog();
            }
            return of(confirmResetPasswordFailureAction({error}));
          })
        )
      )
    )
  );

  private closeResetPasswordDialog() {
    this.authService.closeResetPasswordDialog();
    this.router.navigate([AppPaths.Home]);
  }

  showErrorSnack(error: HttpError) {
    this.snackService.error(TRANSLATIONS.auth.errors[error.code]);
  }

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackService: SnackService,
    private router: Router
  ) {
  }

}
