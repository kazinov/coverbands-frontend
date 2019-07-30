import { createAction, props } from '@ngrx/store';
import { FirebaseUserCredentials } from '@core/firebase/firebase.model';
import { AppUserInfo, CredentialsWithName } from '@core/auth/auth.model';

export const setCurrentUserAction = createAction(
  '[Auth] Set current user',
  props<{ user: AppUserInfo }>()
);

export const registerAction = createAction(
  '[Auth] Register',
  props<{ credentials: CredentialsWithName }>()
);

export const registerSuccessAction = createAction(
  '[Auth] Register success',
  props<{ credentials: FirebaseUserCredentials }>()
);

export const registerFailureAction = createAction(
  '[Auth] Register failure',
  props<{ error: any }>() // TODO: figure out type
);

export const signOutAction = createAction('[Auth] Sign out');

export const signOutSuccessAction = createAction('[Auth] Sign out success');

export const signOutFailureAction = createAction(
  '[Auth] Sign out failure',
  props<{ error: any }>() // TODO: figure out type
);

export const signInAction = createAction('[Auth] Sign in',
  props<{ email: string, password: string }>());

export const signInSuccessAction = createAction('[Auth] Sign in success',
  props<{ credentials: FirebaseUserCredentials }>());

export const signInFailureAction = createAction(
  '[Auth] Sign in failure',
  props<{ error: any }>() // TODO: figure out type
);
