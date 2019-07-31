import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthSelectors } from '@core/auth/auth.selectors';
import { AuthService } from '@core/auth/auth.service';
import { signOutAction } from '@core/auth/auth.actions';
import { TRANSLATIONS } from '@core/translation/translations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loggedIn$ = this.store.pipe(select(this.authSelectors.isAuthenticated));
  currentUser$ = this.store.pipe(select(this.authSelectors.currentUser));
  currentUserDisplayName$ = this.store.pipe(select(this.authSelectors.currentUserDisplayName));

  translations = TRANSLATIONS;

  openAuthDialog() {
    this.authService.openAuthDialog();
  }

  onSignOut() {
    this.store.dispatch(signOutAction());
  }

  constructor(
    private store: Store<any>,
    private authSelectors: AuthSelectors,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

}
