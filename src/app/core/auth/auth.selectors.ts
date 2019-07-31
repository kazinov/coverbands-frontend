import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_STORE_KEY } from '@core/auth/auth.model';
import { AuthState } from '@core/auth/auth.reducer';

@Injectable()
export class AuthSelectors {
  private stateSelector = createFeatureSelector<AuthState>(AUTH_STORE_KEY);

  currentUser = createSelector(
    this.stateSelector,
    (state) => state && state.currentUser
  );

  currentUserDisplayName = createSelector(
    this.currentUser,
    (state) => state && (state.displayName || state.email)
  );

  isAuthenticated = createSelector(
    this.currentUser,
    (state) => !!state
  );

  constructor() { }
}
