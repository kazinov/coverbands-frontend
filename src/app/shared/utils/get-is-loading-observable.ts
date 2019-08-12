import { concat, NEVER, Observable, of } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

export interface IsLoadingObservableOptions {
  startActions: any[];
  stopActions: any[];
  takeUntil?: <T>(source: Observable<T>) => Observable<T>;
}

export function getIsLoadingObservable(actions: Actions, options: IsLoadingObservableOptions) {
  if (!options.takeUntil) {
    options.takeUntil = () => NEVER;
  }

  return concat<boolean>(of(false), actions.pipe(ofType.apply(actions, options.startActions))
    .pipe(
      options.takeUntil,
      switchMap(() => {
        return concat(of(true), actions.pipe(ofType.apply(actions, options.stopActions))
          .pipe(map(() => false)));
      })));
}
