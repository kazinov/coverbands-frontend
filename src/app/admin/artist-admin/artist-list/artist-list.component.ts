import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TRANSLATIONS } from '@core/translation/translations';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent implements OnInit, OnDestroy {
  t = TRANSLATIONS;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private actions$: Actions
  ) {
  }

  ngOnInit() {

  }

  onSubmit() {

  }

  ngOnDestroy(): void {
  }
}
