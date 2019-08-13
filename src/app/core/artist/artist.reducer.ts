import { Artist } from './artist.model';
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { removeArtistsFromStoreAction, upsertArtistsToStoreAction } from '@core/artist/artist.actions';

export interface ArtistState extends EntityState<Artist> {
}

export const artistAdapter: EntityAdapter<Artist> = createEntityAdapter<Artist>();
const initialState = artistAdapter.getInitialState();

export const artistReducer = createReducer(
  initialState,
  on(upsertArtistsToStoreAction, (state, action) => artistAdapter.upsertMany(action.artists, state)),
  on(removeArtistsFromStoreAction, (state, action) => {
    if (action.ids) {
      return artistAdapter.removeMany(action.ids, state);
    }
    return artistAdapter.removeAll(state);
  })
);



