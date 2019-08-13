import { createAction, props } from '@ngrx/store';
import { HttpError } from '@shared/types/http-error';
import { Artist } from '@core/artist/artist.model';

export const upsertArtistsAction = createAction(
  '[Artist] Add artists',
  props<{ artists: Artist[] }>()
);

export const removeArtistsAction = createAction(
  '[Artist] Remove artists',
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
