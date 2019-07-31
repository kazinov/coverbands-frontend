import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppPaths } from '../../app-paths';
import { AuthSelectors } from '@core/auth/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<any>,
    private authSelectors: AuthSelectors,
    private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(this.authSelectors.isAuthenticated)).pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate([AppPaths.Home]);
        }
        return isAuthenticated;
      }));
  }
}
