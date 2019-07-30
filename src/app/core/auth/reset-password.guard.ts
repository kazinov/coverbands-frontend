import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';

@Injectable()
export class ResetPasswordGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (route.queryParams.mode === 'resetPassword'
      && route.queryParams.oobCode) {
      this.authService.openResetPasswordDialog(route.queryParams.oobCode);
    }
    return of(true);
  }
}
