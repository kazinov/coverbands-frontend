import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateArtistWithPublish } from '@artist-admin/artist-admin.actions';
import { updateArtistAction } from '@core/artist/artist.actions';
import { ArtistAdminService } from '@artist-admin/artist-admin.service';
import { exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Artist } from '@core/artist/artist.model';

@Injectable()
export class ArtistAdminEffects {

  updateArtistWithPublish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArtistWithPublish),
      exhaustMap(action => {
          if (action.artist.published) {
            return of(updateArtistAction({artist: action.artist}));
          }

          return this.artistAdminService.openAuthDialog()
            .pipe(
              map((shouldPublish: boolean) => {
                const updatedArtist: Artist = {
                  ...action.artist
                };
                if (shouldPublish) {
                  updatedArtist.published = true;
                }
                return updateArtistAction({artist: updatedArtist});
              })
            );
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private artistAdminService: ArtistAdminService,
  ) {
  }

}
