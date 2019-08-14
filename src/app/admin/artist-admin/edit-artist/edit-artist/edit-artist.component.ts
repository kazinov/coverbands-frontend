import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { FileHelper } from '@shared/utils/file-helper';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesUploadResults } from '@shared/images-uploader/images-uploader.component';
import { Artist, CoverInfo, Link } from '@core/artist/artist.model';
import { MusicGenres } from '@core/models/music-genres.model';
import { Cities } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';
import { select, Store } from '@ngrx/store';
import {
  loadArtistAction,
  loadArtistFailureAction,
  loadArtistSuccessAction,
  updateArtistAction,
  updateArtistFailureAction,
  updateArtistSuccessAction
} from '@core/artist/artist.actions';
import { ActivatedRoute } from '@angular/router';
import { ArtistSelectors } from '@core/artist/artist.selectors';
import { Dictionary } from '@ngrx/entity';
import { getIsLoadingObservable } from '@shared/utils/get-is-loading-observable';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Actions } from '@ngrx/effects';
import { anyBooleanObservableTrue } from '@shared/utils/any-boolean-observable-true';
import assign from 'lodash-es/assign';

const dummyBand: Artist = {
  id: '123',
  name: 'Кавер Бэнд',
  description: `Красивый женский вокал. Исключительно живое и качественное звучание.
Широкий репертуар из лучших мировых и отечественных хитов.
Профессиональные музыканты с большим опытом выступлений.
Творческий подход к любым пожеланиям заказчика.
Тонкое чувство настроения зрителя и его желаний.
Драйв, эмоции и энергетика настоящего концерта`,
  city: Cities[Countries.Russia].SaintPetersburg,
  musicGenres: [MusicGenres.Pop],
  covers: [
    {
      band: 'Ленинград',
      song: 'Лабутены'
    },
    {
      band: 'Queen',
      song: 'We are the champions'
    },
    {
      band: 'Nirvana',
      song: 'Smells like teen spirit'
    },
  ],
  email: 'coverband@gmail.com',
  phoneCode: '+7',
  phoneNumber: '9214456456',
  links: [
    {
      link: 'https://vk.com/ustochnuk',
      description: 'Мы вконтакте'
    },
    {
      link: 'https://www.facebook.com/groups/wg.wohnung.frankfurt/?fref=nf',
      description: 'Мы в facebook'
    }
  ],
  videos: [
    'https://www.youtube.com/embed/M_4fyn_zsMo',
    'https://www.youtube.com/embed/Lt5Cgx3hpeE',
    'https://www.youtube.com/embed/M_4fyn_zsMo',
    'https://www.youtube.com/embed/Lt5Cgx3hpeE',
    'https://www.youtube.com/embed/M_4fyn_zsMo',
    'https://www.youtube.com/embed/Lt5Cgx3hpeE'
  ],
  profileImage: null,
  images: [
    '/assets/images/eminem.jpg',
    '/assets/images/korn.jpg',
    '/assets/images/metallica.jpeg',
    '/assets/images/nirvana.jpg'
  ]
};

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
    })
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

  isLoading$ = anyBooleanObservableTrue(
    [
      this.isArtistLoading$,
      this.isArtistUpdating$
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
    console.log('videos', videos);
  }

  onProfileImageAttached(results: ImagesUploadResults) {
    console.error('onProfileImageAttached', results);
    // TODO: replace with real implementation
    this.fakeUploadImage(results.imageVersions[1], (base64) => {
      this.fakeEmitBandChange((band: Artist) => {
        band.profileImage = this.domSanitizer.bypassSecurityTrustUrl(base64) as any;
        return band;
      });
    });
  }

  onProfileImageDelete(imageUrl: string) {
    // TODO: replace with real implementation
    this.fakeEmitBandChange((band: Artist) => {
      band.profileImage = null;
      return band;
    });
  }

  onImageAttached(results: ImagesUploadResults) {
    // TODO: replace with real implementation
    this.fakeUploadImage(results.imageVersions[0], (base64) => {
      this.fakeEmitBandChange((band: Artist) => {
        band.images.push(this.domSanitizer.bypassSecurityTrustUrl(base64) as any);
        return band;
      });
    });
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
