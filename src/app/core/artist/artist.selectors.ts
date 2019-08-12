import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { artistAdapter, ArtistState } from '@core/artist/artist.reducer';
import { ARTIST_STORE_KEY } from '@core/artist/artist.model';

const {
  selectTotal,
  selectAll,
  selectEntities,
  selectIds
} = artistAdapter.getSelectors();

@Injectable()
export class ArtistSelectors {
  private stateSelector = createFeatureSelector<ArtistState>(ARTIST_STORE_KEY);

  selectTotal = createSelector(this.stateSelector, selectTotal);
  selectAll = createSelector(this.stateSelector, selectAll);
  selectEntities = createSelector(this.stateSelector, selectEntities);
  selectIds = createSelector(this.stateSelector, selectIds);
}
