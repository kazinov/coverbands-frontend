import { createAction, props } from '@ngrx/store';
import * as firebase from 'firebase/app';

export const setCurrentUser = createAction(
  '[Auth] Set current user',
  props<{ user: firebase.UserInfo }>()
);
