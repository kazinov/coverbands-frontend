import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class ResetPasswordGuard implements CanActivate {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (route.queryParams.mode === 'resetPassword'
      && route.queryParams.oobCode) {

    }
    return of(true);
  }
}
