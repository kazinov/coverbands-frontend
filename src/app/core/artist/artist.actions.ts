import { createAction, props } from '@ngrx/store';
import { HttpError } from '@shared/types/http-error';
import { Artist } from '@core/artist/artist.model';

export const upsertArtistsToStoreAction = createAction(
  '[Artist] Add artists to store',
  props<{ artists: Artist[] }>()
);

export const removeArtistsFromStoreAction = createAction(
  '[Artist] Remove artists from store',
  props<{ ids?: string[] }>()
);

export const createArtistAction = createAction('[Artist] Create artist',
  props<{ artist: Partial<Artist> }>());

export const createArtistSuccessAction = createAction('[Artist] Create artist success');

export const createArtistFailureAction = createAction(
  '[Artist admin] Create artist failure',
  props<{ error: HttpError }>()
);

export const updateArtistAction = createAction('[Artist] Update artist',
  props<{ artist: Artist }>());

export const updateArtistSuccessAction = createAction('[Artist] Update artist success');

export const updateArtistFailureAction = createAction(
  '[Artist] Update artist failure',
  props<{ error: HttpError }>()
);
