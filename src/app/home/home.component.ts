import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cities } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  city: string = Cities[Countries.Russia].SaintPetersburg;

  constructor() {
  }

  ngOnInit() {
  }

  onCityChange(city) {
    console.error('city', city);
  }
}
