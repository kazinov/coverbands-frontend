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

export const loadArtistAction = createAction('[Artist] Load artist',
  props<{ id: string }>());

export const loadArtistSuccessAction = createAction('[Artist] Load artist success');

export const loadArtistFailureAction = createAction(
  '[Artist] Load artist failure',
  props<{ error: HttpError }>()
);

export const uploadArtistProfileImageAction = createAction('[Artist] Upload artist profile image',
  props<{artist: Artist; image: File; thumb: File}>()
);

export const uploadArtistProfileImageSuccessAction = createAction('[Artist] Upload artist profile image success');

export const uploadArtistProfileImageFailureAction = createAction(
  '[Artist] Upload artist profile image failure',
  props<{ error: HttpError }>()
);

export const deleteArtistProfileImageAction = createAction('[Artist] Delete artist profile image',
  props<{artist: Artist}>()
);

export const deleteArtistProfileImageSuccessAction = createAction('[Artist] Delete artist profile image success');

export const deleteArtistProfileImageFailureAction = createAction(
  '[Artist] Delete artist profile image failure',
  props<{ error: HttpError }>()
);
