import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

export const MAX_BAND_IMAGES = 5;

@Component({
  selector: 'app-edit-band-images',
  templateUrl: './edit-band-images.component.html',
  styleUrls: ['./edit-band-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBandImagesComponent implements OnInit {
  @Input() band: Band;
  @Output() profileImageAttached = new EventEmitter<File>();
  @Output() profileImageDelete = new EventEmitter<string>();
  @Output() imageAttached = new EventEmitter<File>();
  @Output() imageDelete = new EventEmitter<string>();

  isProfileImageLoading = false;
  isImageLoading = false;
  maxImages = MAX_BAND_IMAGES;

  profileImageCropperSettings = profileImageCropperSettings;

  ngOnInit() {
  }

  onProfileImageAttached(image: File) {
      this.profileImageAttached.emit(image);
  }

  onProfileImageDelete(imageUrl: string) {
    this.profileImageDelete.emit(imageUrl);
  }

  onImageAttached(image: File) {
    this.imageAttached.emit(image);
  }

  onImageDelete(imageUrl: string) {
    this.imageDelete.emit(imageUrl);
  }

  constructor() {

  }
}
