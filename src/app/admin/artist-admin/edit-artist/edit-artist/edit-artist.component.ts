import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, take, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Artist, CoverInfo, Link } from '@core/artist/artist.model';
import { select, Store } from '@ngrx/store';
import {
  deleteArtistImageAction,
  deleteArtistImageFailureAction,
  deleteArtistImageSuccessAction,
  deleteArtistProfileImageAction,
  deleteArtistProfileImageFailureAction,
  deleteArtistProfileImageSuccessAction,
  loadArtistAction,
  loadArtistFailureAction,
  loadArtistSuccessAction,
  updateArtistAction,
  updateArtistFailureAction,
  updateArtistSuccessAction,
  uploadArtistImageAction,
  uploadArtistImageFailureAction,
  uploadArtistImageSuccessAction,
  replaceArtistProfileImageAction,
  replaceArtistProfileImageFailureAction,
  replaceArtistProfileImageSuccessAction
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
import { ARTIST_TYPE_TO_TAB, EditArtistTab } from '@artist-admin/edit-artist/edit-artist/edit-artist.model';
import { TRANSLATIONS } from '@core/translation/translations';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistComponent implements OnInit, OnDestroy {
  t = TRANSLATIONS;
  EditArtistTab = EditArtistTab;
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
        replaceArtistProfileImageAction
      ],
      stopActions: [
        replaceArtistProfileImageSuccessAction,
        replaceArtistProfileImageFailureAction
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

  isImageUploading$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        uploadArtistImageAction
      ],
      stopActions: [
        uploadArtistImageSuccessAction,
        uploadArtistImageFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  isImageDeleting$ = getIsLoadingObservable(
    this.actions$,
    {
      startActions: [
        deleteArtistImageAction
      ],
      stopActions: [
        deleteArtistImageSuccessAction,
        deleteArtistImageFailureAction
      ],
      takeUntil: untilDestroyed(this)
    }
  );

  isLoading$ = anyBooleanObservableTrue(
    [
      this.isArtistLoading$,
      this.isArtistUpdating$,
      this.isProfileImageUploading$,
      this.isProfileImageDeleting$,
      this.isImageUploading$,
      this.isImageDeleting$
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

  tabs$ = this.artist$
    .pipe(
      map((artist) => artist && ARTIST_TYPE_TO_TAB[artist.type])
    );

  selectedTab$ = new BehaviorSubject<EditArtistTab>(EditArtistTab.Main);
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
    this.onArtist(artist => this.store.dispatch(replaceArtistProfileImageAction({
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
    this.onArtist(artist => this.store.dispatch(uploadArtistImageAction({
        artist,
        image: results,
      }))
    );
  }

  onImageDelete(imagePath: string) {
    this.onArtist(artist => this.store.dispatch(deleteArtistImageAction({
        artist,
        imagePath
      }))
    );
  }

  onTabClick(tab: EditArtistTab) {
    this.selectedTab$.next(tab);
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
