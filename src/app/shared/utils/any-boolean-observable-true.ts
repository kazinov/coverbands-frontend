import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { anyBooleanTrue } from '@shared/utils/any-boolean-true';

export function anyBooleanObservableTrue(observables: Observable<boolean>[]) {
  return combineLatest(
    ...observables
  )
    .pipe(
      map(anyBooleanTrue),
      distinctUntilChanged()
    );
}
