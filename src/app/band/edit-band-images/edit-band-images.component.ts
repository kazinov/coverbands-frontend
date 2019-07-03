import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Band } from '../../core/bands/bands.model';

@Component({
  selector: 'app-edit-band-images',
  templateUrl: './edit-band-images.component.html',
  styleUrls: ['./edit-band-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBandImagesComponent implements OnInit {
  @Input() band: Band;

  isLoading = false;

  ngOnInit() {
  }

  onImagesAttached(images: File[]) {
    console.error('onImagesAttached', images);
  }

  onImageDelete(imageUrl: string) {
    console.error('onImageDelete', imageUrl);
  }

  constructor() {

  }
}
