import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Artist } from '../../core/bands/bands.model';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBandComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  onSaveClick(data: Artist) {
    console.log('main info', data);
  }
}
