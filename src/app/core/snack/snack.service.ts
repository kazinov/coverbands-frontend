import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import { MatSnackBar } from '@angular/material';
import { TRANSLATIONS } from '@core/translation/translations';

@Injectable()
export class SnackService {

  error(message: string) {
    return this.snackBar.open(
      message || TRANSLATIONS.snack.error,
      TRANSLATIONS.snack.close,
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'error-snack',
        duration: 5000
      });
  }

  constructor(
    private snackBar: MatSnackBar
  ) {
  }
}
