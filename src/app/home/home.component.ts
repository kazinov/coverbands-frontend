import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArtistTypes } from '@core/models/artist-types.model';
import { Cities } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  city = Cities[Countries.Russia].SaintPetersburg;
  artistType = ArtistTypes.LiveMusic;

  constructor() {
  }

  ngOnInit() {
  }

  onCityChange(value) {
    console.error('value', value);
  }

  onArtistTypeChange(value) {
    console.error('value', value);
  }
}
