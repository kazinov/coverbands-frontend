import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Band } from '../../core/bands/bands.model';
import { ImageCropperHelper } from '../../shared/utils/image-cropper-helper';
import { ResizeImageSettings, Side } from '../../shared/utils/resizing.utils';

const BAND_PROFILE_IMAGE_HEIGHT = 300;
const BAND_IMAGE_HEIGHT = 500;

const PROFILE_IMAGE_CROPPER_SETTINGS = ImageCropperHelper.getDefaultCropperSettings();
PROFILE_IMAGE_CROPPER_SETTINGS.canvasWidth = 600;
PROFILE_IMAGE_CROPPER_SETTINGS.canvasHeight = 300;
PROFILE_IMAGE_CROPPER_SETTINGS.width = BAND_PROFILE_IMAGE_HEIGHT;
PROFILE_IMAGE_CROPPER_SETTINGS.height = BAND_PROFILE_IMAGE_HEIGHT;
PROFILE_IMAGE_CROPPER_SETTINGS.minWidth = 200;
PROFILE_IMAGE_CROPPER_SETTINGS.minHeight = 200;
PROFILE_IMAGE_CROPPER_SETTINGS.keepAspect = true;

const PROFILE_IMAGE_RESIZE_SETTINGS: ResizeImageSettings = {
  side: Side.Height,
  size: BAND_PROFILE_IMAGE_HEIGHT
};

const BAND_IMAGE_RESIZE_SETTINGS: ResizeImageSettings = {
  side: Side.Height,
  size: BAND_IMAGE_HEIGHT
};

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

  profileImageCropperSettings = PROFILE_IMAGE_CROPPER_SETTINGS;
  profileImageResizeSettings = PROFILE_IMAGE_RESIZE_SETTINGS;
  bandImageResizeSettings = BAND_IMAGE_RESIZE_SETTINGS;


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
