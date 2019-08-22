import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
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
  replaceArtistProfileImageAction,
  replaceArtistProfileImageFailureAction,
  replaceArtistProfileImageSuccessAction,
  updateArtistAction,
  updateArtistFailureAction,
  updateArtistSuccessAction,
  uploadArtistImageAction,
  uploadArtistImageFailureAction,
  uploadArtistImageSuccessAction
} from '@core/artist/artist.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistSelectors } from '@core/artist/artist.selectors';
import { Dictionary } from '@ngrx/entity';
import { getIsLoadingObservable } from '@shared/utils/get-is-loading-observable';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Actions } from '@ngrx/effects';
import { anyBooleanObservableTrue } from '@shared/utils/any-boolean-observable-true';
import assign from 'lodash-es/assign';
import { ProfileImageUploadResults } from '@artist-admin/edit-artist/edit-artist-images/edit-artist-images.component';
import { TRANSLATIONS } from '@core/translation/translations';
import { EditArtistTab } from './edit-artist.model';
import { ARTIST_TYPE_TO_TAB } from '@artist-admin/edit-artist/edit-artist/configs/artist-type-to-tab';
import { getFirstInvalidTab } from '@artist-admin/edit-artist/edit-artist/configs/get-first-invalid-tab';
import { AuthSelectors } from '@core/auth/auth.selectors';
import { AppPaths } from '../../../../app-paths';
import { updateArtistWithPublish } from '@artist-admin/artist-admin.actions';

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

  published$ = this.artist$
    .pipe(
      map((artist) => artist ? artist.published : null)
    );

  tabs$ = this.artist$
    .pipe(
      map((artist) => artist && ARTIST_TYPE_TO_TAB[artist.type])
    );

  lastTab$ = this.tabs$
    .pipe(
      map((tabs: EditArtistTab[]) => tabs && tabs[tabs.length - 1])
    );

  onboardingTab$ = this.artist$
    .pipe(
      withLatestFrom(this.tabs$),
      map(([artist, tabs]: [Artist, EditArtistTab[]]) => {
        if (!artist || !tabs) {
          return null;
        }

        if (!artist.onboardingStepPassed) {
          return tabs[0];
        }

        const passedStepIndex = tabs.indexOf(artist.onboardingStepPassed as EditArtistTab);
        return (passedStepIndex >= 0 && passedStepIndex < tabs.length - 1)
          ? tabs[passedStepIndex + 1]
          : getFirstInvalidTab(artist);
      })
    );

  isOnboarding$ = this.onboardingTab$
    .pipe(
      map((onboardingTab: EditArtistTab) => !!onboardingTab)
    );

  userSelectedTab$ = new BehaviorSubject<EditArtistTab>(EditArtistTab.Main);

  selectedTab$ = this.onboardingTab$
    .pipe(
      switchMap((onboardingTab: EditArtistTab) => {
        return onboardingTab ? of(onboardingTab) : this.userSelectedTab$;
      })
    );

  saveButtonText$ = this.isOnboarding$
    .pipe(
      map((isOnboarding) => isOnboarding
        ? this.t.editArtist.nextButton
        : this.t.editArtist.saveButton)
    );

  ngUnsubscribe$ = new Subject<void>();

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(loadArtistAction({id: this.artistId}));
    });

    this.artist$
      .pipe(
        filter(val => !!val),
        take(1),
        withLatestFrom(this.store.pipe(select(this.authSelectors.currentUserId))),
        untilDestroyed(this)
      )
      .subscribe(([artist, currentUserId]) => {
        if (artist.userId !== currentUserId) {
          this.router.navigate([AppPaths.Home]);
        }
      });
  }

  get artistId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  onTogglePublished() {
    this.onArtist(artist => {
      this.store.dispatch(updateArtistAction({
        artist: assign({}, artist, {
          published: !artist.published
        })
      }));
    });
  }

  onImagesNextButton() {
    this.onArtist((artist => {
      this.emitUpdateArtist(artist, EditArtistTab.Photo);
    }));
  }

  private emitUpdateArtist(artist: Artist, tab: EditArtistTab) {
    this.onIsOnboarding(([isOnboarding, lastTab]) => {
        if (isOnboarding) {
          artist = {
            ...artist,
            onboardingStepPassed: tab
          };

          if (tab === lastTab) {
            this.store.dispatch(updateArtistWithPublish({artist}));
            return;
          }
        }
        this.store.dispatch(updateArtistAction({artist}));
      }
    );
  }

  onArtist(collback: (artist: Artist) => void) {
    this.artist$
      .pipe(
        take(1),
        tap(collback)
      )
      .subscribe();
  }

  onIsOnboarding(collback: ([isOnboarding, lastTab]: [boolean, EditArtistTab]) => void) {
    this.isOnboarding$
      .pipe(
        take(1),
        withLatestFrom(this.lastTab$),
        tap(collback)
      )
      .subscribe();
  }

  onLinksNextClick() {
    this.onArtist(artist => {
      this.emitUpdateArtist(artist, EditArtistTab.Links);
    });
  }

  onLinksChange(links: Link[]) {
    this.onArtist(artist => {
      this.store.dispatch(updateArtistAction({
        artist: assign({}, artist, {links})
      }));
    });
  }

  onCoversNextClick() {
    this.onArtist(artist => {
      this.emitUpdateArtist(artist, EditArtistTab.Covers);
    });
  }

  onCoversChange(covers: CoverInfo[]) {
    this.onArtist(artist => {
      this.store.dispatch(updateArtistAction({
        artist: assign({}, artist, {covers})
      }));
    });
  }

  onVideosSave(videos: string[]) {
    this.onArtist(artist => {
      this.emitUpdateArtist(assign({}, artist, {videos}), EditArtistTab.Video);
    });
  }

  onProfileImageAttached(results: ProfileImageUploadResults) {
    this.onArtist(artist => {
        this.store.dispatch(replaceArtistProfileImageAction({
          artist,
          image: results.image,
          thumb: results.thumb
        }));
      }
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
    this.onIsOnboarding(([isOnboarding, lastTab]) => {
        if (!isOnboarding) {
          this.userSelectedTab$.next(tab);
        }
      }
    );
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
              private authSelectors: AuthSelectors,
              private actions$: Actions,
              private router: Router) {
  }
}
