import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TRANSLATIONS } from '@core/translation/translations';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { loadCurrentUserArtistsAction } from '@core/artist/artist.actions';
import { ArtistListSelectors } from '@artist-admin/artist-list/artist-list.selectors';
import { AuthSelectors } from '@core/auth/auth.selectors';
import { filter, take, tap } from 'rxjs/operators';
import { Artist } from '@core/artist/artist.model';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent implements OnInit, OnDestroy {
  t = TRANSLATIONS;

  artists$ = this.store.pipe(select(this.artistListSelectors.currentUserArtists));

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
      tap((currentUserId) => {
        this.store.dispatch(loadCurrentUserArtistsAction());
      })
    ).subscribe();

  }

  onRemove(artist: Artist) {
    console.error('artist', artist);
  }

  onSubmit() {

  }

  ngOnDestroy(): void {
  }
}
