import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-band-images',
  templateUrl: './edit-band-images.component.html',
  styleUrls: ['./edit-band-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBandImagesComponent implements OnInit {
  ngOnInit() {
  }

  constructor() {

  }
}
