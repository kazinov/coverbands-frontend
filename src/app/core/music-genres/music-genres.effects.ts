import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import {
  loadMusicGenresAction,
  loadMusicGenresFailureAction,
  loadMusicGenresSuccessAction
} from './music-genres.actions';
import { MusicGenresModuleState } from './music-genres.reducer';
import { MusicGenresService } from './music-genres.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MusicGenresSelectors } from './music-genres.selectors';
import { EMPTY } from 'rxjs';

@Injectable()
export class MusicGenresEffects {

  @Effect()
  load$ = this.actions$.pipe(
    ofType(loadMusicGenresAction.type),
    withLatestFrom(this.store.pipe(select(this.musicGenresSelectors.areGenresLoaded))),
    switchMap(([action, genresLoaded]: [ReturnType<typeof loadMusicGenresSuccessAction>, boolean]) => {
      if (genresLoaded) {
        return EMPTY;
      }
      return this.musicGenresService.loadMusicGenres()
        .pipe(
          map((genres: string[]) => loadMusicGenresSuccessAction({genres})),
          catchError((err: HttpErrorResponse) => of(loadMusicGenresFailureAction(err)))
        );
    }));

  @Effect({dispatch: false})
  loadFailed$ = this.actions$.pipe(
    ofType(loadMusicGenresFailureAction.type),
    tap((action: typeof loadMusicGenresFailureAction) => {
      this.snackBar.open('An error happened');
    }));

  constructor(private actions$: Actions,
              private store: Store<MusicGenresModuleState>,
              private musicGenresService: MusicGenresService,
              private musicGenresSelectors: MusicGenresSelectors,
              private snackBar: MatSnackBar) {
  }
}
