import { createAction, props } from '@ngrx/store';
import { Artist } from './artist.model';

export const upsertArtistsAction = createAction(
  '[Artist] Add artists',
  props<{ artists: Artist[] }>()
);

export const removeArtistsAction = createAction(
  '[Artist] Remove artists',
  props<{ ids?: string[] }>()
);
