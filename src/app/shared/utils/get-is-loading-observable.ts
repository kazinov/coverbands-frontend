import { Observable ,  concat ,  of ,  NEVER } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';

export interface IsLoadingObservableOptions {
  startActions: any[];
  stopActions: any[];
  takeUntil?: Observable<any>;
}

export function getIsLoadingObservable(actions: Actions, options: IsLoadingObservableOptions) {
  if (!options.takeUntil) {
    options.takeUntil = NEVER;
  }

  return concat<boolean>(of(false), actions.pipe(ofType.apply(actions, options.startActions))
    .pipe(takeUntil(options.takeUntil),
      switchMap(() => {
        return concat(of(true), actions.pipe(ofType.apply(actions, options.stopActions))
          .pipe(map(() => false)));
      })));
}
