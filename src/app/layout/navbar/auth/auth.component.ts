import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthSelectors } from '@core/auth/auth.selectors';
import { AuthService } from '@core/auth/auth.service';
import { logoutAction } from '@core/auth/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loggedIn$ = this.store.pipe(select(this.authSelectors.loggedIn));
  currentUser$ = this.store.pipe(select(this.authSelectors.currentUser));
  currentUserDisplayName$ = this.store.pipe(select(this.authSelectors.currentUserDisplayName));

  openAuthDialog() {
    this.authService.openAuthDialog();
  }

  onLogOut() {
    this.store.dispatch(logoutAction());
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
