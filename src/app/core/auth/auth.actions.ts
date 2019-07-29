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
