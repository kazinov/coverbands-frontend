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

export const updateArtistAction = createAction('[Artist admin] Update artist',
  props<{ artist: Artist }>());

export const updateArtistSuccessAction = createAction('[Artist admin] Update artist success');

export const updateArtistFailureAction = createAction(
  '[Artist admin] Update artist failure',
  props<{ error: HttpError }>()
);
