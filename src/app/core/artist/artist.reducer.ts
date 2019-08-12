import { Artist } from './artist.model';
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { removeArtistsAction, upsertArtistsAction } from '@core/artist/artist.actions';

export interface ArtistState extends EntityState<Artist> {
}

export const artistAdapter: EntityAdapter<Artist> = createEntityAdapter<Artist>();
const initialState = artistAdapter.getInitialState();

export const artistReducer = createReducer(
  initialState,
  on(upsertArtistsAction, (state, action) => artistAdapter.upsertMany(action.artists, state)),
  on(removeArtistsAction, (state, action) => {
    if (action.ids) {
      return artistAdapter.removeMany(action.ids, state);
    }
    return artistAdapter.removeAll(state);
  })
);



