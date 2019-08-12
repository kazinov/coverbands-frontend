import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TRANSLATIONS } from '@core/translation/translations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorOption } from '@shared/utils/selector-option';
import { ALL_ARTIST_TYPES } from '@core/models/artist-types.model';
import { Store } from '@ngrx/store';
import {
  createArtistAction,
  createArtistFailureAction,
  createArtistSuccessAction
} from '@artist-admin/artist-admin.actions';
import { getIsLoadingObservable } from '@shared/utils/get-is-loading-observable';
import { Actions } from '@ngrx/effects';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArtistComponent implements OnInit, OnDestroy {
  form: FormGroup;
  t = TRANSLATIONS;

  artistTypes: SelectorOption[]
    = ALL_ARTIST_TYPES.map((typeId) => ({
    id: typeId,
    label: TRANSLATIONS.artistTypes[typeId]
  }));

  isLoading$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        createArtistAction
      ],
      stopActions: [
        createArtistSuccessAction,
        createArtistFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private actions$: Actions
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.store.dispatch(createArtistAction({
      artist: this.form.value
    }));
  }

  ngOnDestroy(): void {
  }
}
