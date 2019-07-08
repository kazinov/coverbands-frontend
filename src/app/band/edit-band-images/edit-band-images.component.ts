import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Band } from '../../core/bands/bands.model';
import { ImageCropperHelper } from '../../shared/utils/image-cropper-helper';

const profileImageCropperSettings = ImageCropperHelper.getDefaultCropperSettings();
profileImageCropperSettings.canvasWidth = 600;
profileImageCropperSettings.canvasHeight = 300;
profileImageCropperSettings.width = 300;
profileImageCropperSettings.height = 300;
profileImageCropperSettings.minWidth = 200;
profileImageCropperSettings.minHeight = 200;
profileImageCropperSettings.keepAspect = true;

@Component({
  selector: 'app-edit-band-images',
  templateUrl: './edit-band-images.component.html',
  styleUrls: ['./edit-band-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBandImagesComponent implements OnInit {
  @Input() band: Band;

  isProfileImageLoading = false;
  isImageLoading = false;

  profileImageCropperSettings = profileImageCropperSettings;

  ngOnInit() {
  }

  onProfileImageAttached(images: File[]) {
    console.error('onProfileImageAttached', images);
  }

  onProfileImageDelete(imageUrl: string) {
    console.error('onProfileImageDelete', imageUrl);
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
