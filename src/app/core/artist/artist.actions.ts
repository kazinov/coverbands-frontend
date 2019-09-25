import { createAction, props } from '@ngrx/store';
import { HttpError } from '@shared/types/http-error';
import { Artist, LoadArtistsParams } from '@core/artist/artist.model';

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

export const replaceArtistProfileImageAction = createAction('[Artist] Replace artist profile image',
  props<{ artist: Artist; image: File; thumb: File }>()
);

export const replaceArtistProfileImageSuccessAction = createAction('[Artist] Replace artist profile image success');

export const replaceArtistProfileImageFailureAction = createAction(
  '[Artist] Replace artist profile image failure',
  props<{ error: HttpError }>()
);

export const deleteArtistProfileImageAction = createAction('[Artist] Delete artist profile image',
  props<{ artist: Artist }>()
);

export const deleteArtistProfileImageSuccessAction = createAction('[Artist] Delete artist profile image success');

export const deleteArtistProfileImageFailureAction = createAction(
  '[Artist] Delete artist profile image failure',
  props<{ error: HttpError }>()
);

export const uploadArtistImageAction = createAction('[Artist] Upload artist image',
  props<{ artist: Artist; image: File; }>()
);

export const uploadArtistImageSuccessAction = createAction('[Artist] Upload artist image success');

export const uploadArtistImageFailureAction = createAction(
  '[Artist] Upload artist profile failure',
  props<{ error: HttpError }>()
);

export const deleteArtistImageAction = createAction('[Artist] Delete artist image',
  props<{ artist: Artist; imagePath: string; }>()
);

export const deleteArtistImageSuccessAction = createAction('[Artist] Delete artist image success');

export const deleteArtistImageFailureAction = createAction(
  '[Artist] Delete artist image failure',
  props<{ error: HttpError }>()
);

export const loadCurrentUserArtistsAction = createAction('[Artist] Load current user artists');

export const loadArtistsAction = createAction('[Artist] Load artists',
  props<{ params: LoadArtistsParams }>()
);

export const loadArtistsSuccessAction = createAction('[Artist] Load artists success');

export const loadArtistsFailureAction = createAction(
  '[Artist] Load artists failure',
  props<{ error: HttpError }>()
);

export const deleteArtistAction = createAction('[Artist] Delete artist',
  props<{ id: string }>()
);

export const deleteArtistSuccessAction = createAction('[Artist] Delete artist success');

export const deleteArtistFailureAction = createAction(
  '[Artist] Delete artist failure',
  props<{ error: HttpError }>()
);
