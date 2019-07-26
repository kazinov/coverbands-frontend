import { Action, combineReducers, createReducer, on } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { setCurrentUser } from '@core/auth/auth.actions';

export interface AuthState {
  currentUser: firebase.UserInfo;
}

const currentUserReducer = createReducer(
  null,
  on(setCurrentUser, (state, action) => (action.user)),
);

const reducers = combineReducers({
  currentUser: currentUserReducer
});

export function authReducer(state: AuthState, action: Action) {
  return reducers(state, action);
}
