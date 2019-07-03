import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MainBandInfo } from '../main-band-info.model';
import { Band, BandLink, CoverInfo } from '../../core/bands/bands.model';
import { Observable, timer } from 'rxjs';
import { Cities } from '../../core/cities/cities.data';
import { MusicGenres } from '../../core/music-genres/music-genres.data';
import { map, shareReplay, tap } from 'rxjs/operators';
import { BandContacts } from '../band-contacts/band-contacts.model';
import { BandPrices } from '../band-prices/band-prices.model';

const dummyBand: Band = {
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
  email: "coverband@gmail.com",
  phoneCode: "+7",
  phoneNumber: "9214456456",
  links: [
    {
      link: "https://vk.com/ustochnuk",
      description: "Мы вконтакте"
    },
    {
      link: "https://www.facebook.com/groups/wg.wohnung.frankfurt/?fref=nf",
      description: "Мы в facebook"
    }
  ],
  profileImage: '/assets/images/eminem.jpg',
  images: [
    '/assets/images/eminem.jpg',
    '/assets/images/korn.jpg',
    '/assets/images/metallica.jpeg',
    '/assets/images/nirvana.jpg',
  ]
};

@Component({
  selector: 'app-edit-band',
  templateUrl: './edit-band.component.html',
  styleUrls: ['./edit-band.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBandComponent implements OnInit {
  band$: Observable<Band> = timer(1000)
    .pipe(
      map(() => dummyBand),
      shareReplay()
    );
  covers$: Observable<CoverInfo[]> = this.band$
    .pipe(
      map((band) => band ? band.covers : null)
    );
  links$: Observable<BandLink[]> = this.band$
    .pipe(
      map((band) => band ? band.links : null)
    );

  constructor() {
  }

  ngOnInit() {
  }

  onMainInfoSave(info: MainBandInfo) {
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
}
