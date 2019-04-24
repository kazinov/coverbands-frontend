import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { loadCitiesAction, loadCitiesFailureAction, loadCitiesSuccessAction } from './cities.actions';
import { CitiesService } from './cities.service';
import { CitiesModuleState } from './cities.reducer';
import { CitiesSelectors } from './cities.selectors';
import { EMPTY } from 'rxjs';

@Injectable()
export class CitiesEffects {

  @Effect()
  load$ = this.actions$.pipe(
    ofType(loadCitiesAction.type),
    switchMap((action: ReturnType<typeof loadCitiesAction>) => {
      return this.store.pipe(
        select(this.citiesSelectors.areCitiesLoadedForCountrySelectorFactory(action.countryId)),
        take(1),
        switchMap((loaded: boolean) => {
          if (loaded) {
            return EMPTY;
          }

          return this.citiesService.loadCities(action.countryId)
            .pipe(
              map((cities: string[]) => loadCitiesSuccessAction({
                countryId: action.countryId,
                cities
              })),
              catchError((err: HttpErrorResponse) => of(loadCitiesFailureAction(err)))
            );
        })
      );
    }));

  @Effect({dispatch: false})
  loadFailed$ = this.actions$.pipe(
    ofType(loadCitiesFailureAction.type),
    tap((action: typeof loadCitiesFailureAction) => {
      this.snackBar.open('An error happened');
    }));

  constructor(private actions$: Actions,
              private store: Store<CitiesModuleState>,
              private citiesService: CitiesService,
              private citiesSelectors: CitiesSelectors,
              private snackBar: MatSnackBar) {
  }
}
