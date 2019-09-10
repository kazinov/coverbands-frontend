import { Injectable } from '@angular/core';
import { ArtistSelectors } from '@core/artist/artist.selectors';
import { AuthSelectors } from '@core/auth/auth.selectors';
import { createSelector } from '@ngrx/store';

@Injectable()
export class ArtistListSelectors {

  currentUserArtists = createSelector(
    this.authSelectors.currentUserId,
    this.artistSelectors.selectAll,
    (currentUserId, artists) => {
      return artists && artists.filter((artist) => artist.userId === currentUserId);
    }
  )

  constructor(
    private artistSelectors: ArtistSelectors,
    private authSelectors: AuthSelectors) {

  }
}
