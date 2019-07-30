import { FirebaseError } from 'firebase';
import { throwError } from 'rxjs';
import { parseFirebaseError } from '@core/firebase/firebase.model';

export function fromFirebaseError(error: FirebaseError) {
  return throwError(parseFirebaseError(error));
}
