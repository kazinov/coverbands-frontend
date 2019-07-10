import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Artist, BandLink, CoverInfo } from '../../core/bands/bands.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cities } from '../../core/cities/cities.data';
import { MusicGenres } from '../../core/music-genres/music-genres.data';
import { map, takeUntil } from 'rxjs/operators';
import { BandContacts } from '../band-contacts/band-contacts.model';
import { BandPrices } from '../band-prices/band-prices.model';
import { FileHelper } from '../../shared/utils/file-helper';
import cloneDeep from 'lodash-es/cloneDeep';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesUploadResults } from '../../shared/images-uploader/images-uploader.component';

const dummyBand: Artist = {
  id: '123',
  name: 'Кавер Бэнд',
  description: `Красивый женский вокал. Исключительно живое и качественное звучание.
Широкий репертуар из лучших мировых и отечественных хитов.
Профессиональные музыканты с большим опытом выступлений.
Творческий подход к любым пожеланиям заказчика.
Тонкое чувство настроения зрителя и его желаний.
Драйв, эмоции и энергетика настоящего концерта`,
  city: Cities.SaintPetersburg,
  genres: [MusicGenres.Pop],
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
  profileImage: null,
  images: [
    '/assets/images/eminem.jpg',
    '/assets/images/korn.jpg',
    '/assets/images/metallica.jpeg',
    '/assets/images/nirvana.jpg'
  ]
};

@Component({
  selector: 'app-edit-band',
  templateUrl: './edit-band.component.html',
  styleUrls: ['./edit-band.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBandComponent implements OnInit, OnDestroy {
  band$ = new BehaviorSubject(dummyBand);
  covers$: Observable<CoverInfo[]> = this.band$
    .pipe(
      map((band) => band ? band.covers : null)
    );
  links$: Observable<BandLink[]> = this.band$
    .pipe(
      map((band) => band ? band.links : null)
    );
  ngUnsubscribe$ = new Subject<void>();

  ngOnInit() {
  }

  onMainInfoSave(info: Artist) {
    console.log('onMainInfoSave', info);
  }

  onContactsSave(contacts: BandContacts) {
    console.log('onContactsSave', contacts);
  }

  onLinksSave(links: BandLink[]) {
    console.log('links', links);
  }

  onPricesSave(prices: BandPrices) {
    console.log('prices', prices);
  }

  onAddCover(cover: CoverInfo) {
    console.log('onAddCover', cover);
  }

  onProfileImageAttached(results: ImagesUploadResults) {
    console.error('onProfileImageAttached', results)
    // TODO: replace with real implementation
    this.fakeUploadImage(results.imageVersions[1], (base64) => {
      this.fakeEmitBandChange((band: Artist) => {
        band.profileImage = this.domSanitizer.bypassSecurityTrustUrl(base64) as any;
        return band;
      })
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
            !== (imageUrl as any).changingThisBreaksApplicationSecurity
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
      })
  }

  // TODO: remove when backend implemented
  private fakeEmitBandChange(changeBand: (band: Artist) => Artist) {
    let clone: Artist = cloneDeep(this.band$.getValue());
    clone = changeBand(clone);
    this.band$.next(clone);
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private domSanitizer: DomSanitizer) {
  }
}
