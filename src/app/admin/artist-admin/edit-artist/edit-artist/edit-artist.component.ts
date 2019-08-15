import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, take, takeUntil, tap } from 'rxjs/operators';
import { FileHelper } from '@shared/utils/file-helper';
import { DomSanitizer } from '@angular/platform-browser';
import { Artist, CoverInfo, Link } from '@core/artist/artist.model';
import { select, Store } from '@ngrx/store';
import {
  deleteArtistProfileImageAction, deleteArtistProfileImageFailureAction, deleteArtistProfileImageSuccessAction,
  loadArtistAction,
  loadArtistFailureAction,
  loadArtistSuccessAction,
  updateArtistAction,
  updateArtistFailureAction,
  updateArtistSuccessAction,
  uploadArtistProfileImageAction,
  uploadArtistProfileImageFailureAction,
  uploadArtistProfileImageSuccessAction
} from '@core/artist/artist.actions';
import { ActivatedRoute } from '@angular/router';
import { ArtistSelectors } from '@core/artist/artist.selectors';
import { Dictionary } from '@ngrx/entity';
import { getIsLoadingObservable } from '@shared/utils/get-is-loading-observable';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Actions } from '@ngrx/effects';
import { anyBooleanObservableTrue } from '@shared/utils/any-boolean-observable-true';
import assign from 'lodash-es/assign';
import { ProfileImageUploadResults } from '@artist-admin/edit-artist/edit-artist-images/edit-artist-images.component';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistComponent implements OnInit, OnDestroy {
  artist$ = this.store.pipe(
    select(this.artistSelectors.selectEntities),
    map((artists: Dictionary<Artist>) => {
      return artists[this.artistId];
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  isArtistLoading$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        loadArtistAction
      ],
      stopActions: [
        loadArtistSuccessAction,
        loadArtistFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  isArtistUpdating$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        updateArtistAction
      ],
      stopActions: [
        updateArtistSuccessAction,
        updateArtistFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  isProfileImageUploading$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        uploadArtistProfileImageAction
      ],
      stopActions: [
        uploadArtistProfileImageSuccessAction,
        uploadArtistProfileImageFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  isProfileImageDeleting$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        deleteArtistProfileImageAction
      ],
      stopActions: [
        deleteArtistProfileImageSuccessAction,
        deleteArtistProfileImageFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  isLoading$ = anyBooleanObservableTrue(
    [
      this.isArtistLoading$,
      this.isArtistUpdating$,
      this.isProfileImageUploading$,
      this.isProfileImageDeleting$
    ]
  );

  covers$: Observable<CoverInfo[]> = this.artist$
    .pipe(
      map((band) => band ? band.covers : null)
    );
  links$: Observable<Link[]> = this.artist$
    .pipe(
      map((band) => band ? band.links : null)
    );

  videos$: Observable<string[]> = this.artist$
    .pipe(
      map((band) => band ? band.videos : null)
    );

  ngUnsubscribe$ = new Subject<void>();

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(loadArtistAction({id: this.artistId}));
    });
  }

  get artistId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  updateArtist(artist: Artist) {
    this.store.dispatch(updateArtistAction({artist}));
  }

  onArtist(collback: (artist: Artist) => void) {
    this.artist$
      .pipe(
        take(1),
        tap(collback)
      )
      .subscribe();
  }

  onLinksSave(links: Link[]) {
    this.onArtist(artist => this.store.dispatch(updateArtistAction({
        artist: assign({}, artist, {links})
      }))
    );
  }

  onCoversChange(covers: CoverInfo[]) {
    this.onArtist(artist => this.store.dispatch(updateArtistAction({
        artist: assign({}, artist, {covers})
      }))
    );
  }

  onVideosSave(videos: string[]) {
    this.onArtist(artist => this.store.dispatch(updateArtistAction({
        artist: assign({}, artist, {videos})
      }))
    );
  }

  onProfileImageAttached(results: ProfileImageUploadResults) {
    this.onArtist(artist => this.store.dispatch(uploadArtistProfileImageAction({
        artist,
        image: results.image,
        thumb: results.thumb
      }))
    );
  }

  onProfileImageDelete() {
    this.onArtist(artist => this.store.dispatch(deleteArtistProfileImageAction({
        artist
      }))
    );
  }

  onImageAttached(results: File) {
    // // TODO: replace with real implementation
    // this.fakeUploadImage(results.imageVersions[0], (base64) => {
    //   this.fakeEmitBandChange((band: Artist) => {
    //     band.images.push(this.domSanitizer.bypassSecurityTrustUrl(base64) as any);
    //     return band;
    //   });
    // });
  }

  onImageDelete(imageUrl: string) {
    // TODO: replace with real implementation
    this.fakeEmitBandChange((band: Artist) => {
      band.images = band.images.filter((image: string) => {
        if ((image as any).changingThisBreaksApplicationSecurity
          && (imageUrl as any).changingThisBreaksApplicationSecurity) {
          return (image as any).changingThisBreaksApplicationSecurity
            !== (imageUrl as any).changingThisBreaksApplicationSecurity;
        }
        return image !== imageUrl;
      });
      return band;
    });
  }

  // TODO: remove when backend implemented
  private fakeUploadImage(image: File, onUpload: (base64: string) => void) {
    FileHelper.readFileAsDataURL(image)
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((base64: string) => {
        onUpload(base64);
      });
  }

  // TODO: remove when backend implemented
  private fakeEmitBandChange(changeBand: (band: Artist) => Artist) {
    // let clone: Artist = cloneDeep(this.artist$.getValue());
    // clone = changeBand(clone);
    // this.artist$.next(clone);
    // this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private domSanitizer: DomSanitizer,
              private store: Store<any>,
              private activatedRoute: ActivatedRoute,
              private artistSelectors: ArtistSelectors,
              private actions$: Actions) {
  }
}
