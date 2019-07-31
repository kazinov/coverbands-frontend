import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TRANSLATIONS } from '@core/translation/translations';

const SNACK_CONFIG = {
  horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
  verticalPosition: 'top' as MatSnackBarVerticalPosition,
  duration: 8000
};

@Injectable()
export class SnackService {

  error(message: string) {
    return this.snackBar.open(
      message || TRANSLATIONS.snack.error,
      TRANSLATIONS.snack.close,
      {
        ...SNACK_CONFIG,
        panelClass: 'error-snack',
      }
    );
  }

  success(message: string) {
    return this.snackBar.open(
      message || TRANSLATIONS.snack.error,
      TRANSLATIONS.snack.close,
      {
        ...SNACK_CONFIG,
        panelClass: 'success-snack',
      }
    );
  }

  constructor(
    private snackBar: MatSnackBar
  ) {
  }
}
