import { createAction, props } from '@ngrx/store';
import { FirebaseUserCredentials } from '@core/firebase/firebase.model';
import { AppUserInfo, CredentialsWithName } from '@core/auth/auth.model';
import { HttpError } from '@shared/types/http-error';

export const setCurrentUserAction = createAction(
  '[Auth] Set current user',
  props<{ user: AppUserInfo }>()
);

export const registerAction = createAction(
  '[Auth] Register',
  props<{ credentials: CredentialsWithName }>()
);

export const registerSuccessAction = createAction(
  '[Auth] Register success'
);

export const registerFailureAction = createAction(
  '[Auth] Register failure',
  props<{ error: HttpError }>()
);

export const signOutAction = createAction('[Auth] Sign out');

export const signOutSuccessAction = createAction('[Auth] Sign out success');

export const signOutFailureAction = createAction(
  '[Auth] Sign out failure',
  props<{ error: HttpError }>()
);

export const signInAction = createAction('[Auth] Sign in',
  props<{ email: string, password: string }>());

export const signInSuccessAction = createAction('[Auth] Sign in success',
  props<{ credentials: FirebaseUserCredentials }>());

export const signInFailureAction = createAction(
  '[Auth] Sign in failure',
  props<{ error: HttpError }>()
);

export const sendResetPasswordAction = createAction('[Auth] Send reset password',
  props<{ email: string}>());

export const sendResetPasswordSuccessAction = createAction('[Auth] Send reset password success');

export const sendResetPasswordFailureAction = createAction(
  '[Auth] Send reset password failure',
  props<{ error: HttpError }>()
);

export const confirmResetPasswordAction = createAction('[Auth] Confirm reset password',
  props<{ code: string, password: string}>());

export const confirmResetPasswordSuccessAction = createAction('[Auth] Confirm reset password success');

export const confirmResetPasswordFailureAction = createAction(
  '[Auth] Confirm reset password failure',
  props<{ error: HttpError }>()
);
