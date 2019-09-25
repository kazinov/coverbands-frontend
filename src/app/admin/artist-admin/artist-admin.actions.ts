import { createAction, props } from '@ngrx/store';
import { Artist } from '@core/artist/artist.model';

export const updateArtistWithPublish = createAction(
  '[Artist admin] Update artist with publish',
  props<{ artist: Artist}>()
);

export const deleteArtistWithConfirmation = createAction(
  '[Artist admin] Delete artist with confirmation',
  props<{ artist: Artist}>()
);
