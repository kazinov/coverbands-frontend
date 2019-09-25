import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TRANSLATIONS } from '@core/translation/translations';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import {
  loadArtistsAction,
  loadArtistsFailureAction,
  loadArtistsSuccessAction,
  loadCurrentUserArtistsAction
} from '@core/artist/artist.actions';
import { ArtistListSelectors } from '@artist-admin/artist-list/artist-list.selectors';
import { AuthSelectors } from '@core/auth/auth.selectors';
import { delay, filter, take, tap } from 'rxjs/operators';
import { Artist } from '@core/artist/artist.model';
import { getIsLoadingObservable } from '@shared/utils/get-is-loading-observable';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { deleteArtistWithConfirmation } from '@artist-admin/artist-admin.actions';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent implements OnInit, OnDestroy {
  t = TRANSLATIONS;

  artists$ = this.store.pipe(select(this.artistListSelectors.currentUserArtists));
  isLoading$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        loadArtistsAction
      ],
      stopActions: [
        loadArtistsSuccessAction,
        loadArtistsFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private actions$: Actions,
    private artistListSelectors: ArtistListSelectors,
    private authSelectors: AuthSelectors
  ) {
  }

  ngOnInit() {
    this.store.pipe(
      select(this.authSelectors.currentUserId),
      filter((val) => !!val),
      take(1),
      delay(0),
      tap((currentUserId) => {
        this.store.dispatch(loadCurrentUserArtistsAction());
      })
    ).subscribe();

  }

  onRemove(artist: Artist, $event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.store.dispatch(deleteArtistWithConfirmation({artist}));
  }

  onSubmit() {

  }

  ngOnDestroy(): void {
  }
}
