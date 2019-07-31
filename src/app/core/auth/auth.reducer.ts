import { Action, combineReducers, createReducer, on } from '@ngrx/store';
import { setCurrentUserAction } from '@core/auth/auth.actions';
import { AppUserInfo } from '@core/auth/auth.model';

export interface AuthState {
  currentUser: AppUserInfo;
  currentUserInitialised: boolean;
}

const currentUserReducer = createReducer(
  null,
  on(setCurrentUserAction, (state, action) => (action.user)),
);

const currentUserInitialisedReducer = createReducer(
  null,
  on(setCurrentUserAction, () => true),
);


const reducers = combineReducers({
  currentUser: currentUserReducer,
  currentUserInitialised: currentUserInitialisedReducer
});

export function authReducer(state: AuthState, action: Action) {
  return reducers(state, action);
}
