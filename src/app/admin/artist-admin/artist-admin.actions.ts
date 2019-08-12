import { createAction, props } from '@ngrx/store';
import { HttpError } from '@shared/types/http-error';
import { Artist } from '@core/artist/artist.model';

export const createArtistAction = createAction('[Artist admin] Create artist',
  props<{ artist: Partial<Artist> }>());

export const createArtistSuccessAction = createAction('[Artist admin] Create artist success');

export const createArtistFailureAction = createAction(
  '[Artist admin] Create artist failure',
  props<{ error: HttpError }>()
);

export const editArtistAction = createAction('[Artist admin] Edit artist',
  props<{ artist: Partial<Artist> }>());

export const editArtistSuccessAction = createAction('[Artist admin] Edit artist success');

export const editArtistFailureAction = createAction(
  '[Artist admin] Edit artist failure',
  props<{ error: HttpError }>()
);
