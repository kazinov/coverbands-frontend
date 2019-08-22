import { createAction, props } from '@ngrx/store';
import { Artist } from '@core/artist/artist.model';

export const updateArtistWithPublish = createAction(
  '[Artist admin] Update artist with publish',
  props<{ artist: Artist}>()
);
