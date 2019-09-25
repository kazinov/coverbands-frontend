import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { deleteArtistWithConfirmation, updateArtistWithPublish } from '@artist-admin/artist-admin.actions';
import { deleteArtistAction, updateArtistAction } from '@core/artist/artist.actions';
import { ArtistAdminService } from '@artist-admin/artist-admin.service';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
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

          return this.artistAdminService.openPublishDialog()
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

  deleteArtistWithConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArtistWithConfirmation),
      exhaustMap(action => {
          return this.artistAdminService.openDeleteDialog(action.artist)
            .pipe(
              switchMap((shouldDelete: boolean) => {
                return shouldDelete ?
                  of(deleteArtistAction({id: action.artist.id})) :
                  EMPTY;
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
