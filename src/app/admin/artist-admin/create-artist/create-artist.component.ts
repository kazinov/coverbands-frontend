import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Artist } from '@core/artist/artist.model';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArtistComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  onSaveClick(data: Artist) {
    console.log('main info', data);
  }
}
