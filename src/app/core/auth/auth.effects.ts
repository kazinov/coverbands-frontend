import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { FirebaseService } from '@core/firebase/firebase.service';
import { map } from 'rxjs/operators';
import { setCurrentUser } from '@core/auth/auth.actions';
import { FirebaseUserInfo } from '@core/firebase/firebase.model';

@Injectable()
export class AuthEffects {

  authChange$ = createEffect(() => {
      return this.firebaseService.authStateChanged$
        .pipe(
          map((user: FirebaseUserInfo) => setCurrentUser({user}))
        );
    }
  );

  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService
  ) {
  }

}
