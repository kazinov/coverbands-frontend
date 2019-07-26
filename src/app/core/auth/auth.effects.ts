import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { setCurrentUser } from '@core/auth/auth.actions';
import { FirebaseUserInfo } from '@core/firebase/firebase.model';
import { AuthService } from '@core/auth/auth.service';

@Injectable()
export class AuthEffects {

  authChange$ = createEffect(() => {
      return this.authService.authStateChanged$
        .pipe(
          map((user: FirebaseUserInfo) => setCurrentUser({user}))
        );
    }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

}
