import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Band } from '../../core/bands/bands.model';
import { ImageCropperHelper } from '../../shared/utils/image-cropper-helper';
import { ResizeImageSettings, Side } from '../../shared/utils/resizing.utils';
import { ImagesUploadResults } from '../../shared/images-uploader/images-uploader.component';

const BAND_PROFILE_THUMB_IMAGE_WIDTH = 200;
const BAND_IMAGE_HEIGHT = 500;

const PROFILE_IMAGE_CROPPER_SETTINGS = ImageCropperHelper.getDefaultCropperSettings();
PROFILE_IMAGE_CROPPER_SETTINGS.canvasWidth = 600;
PROFILE_IMAGE_CROPPER_SETTINGS.canvasHeight = 300;
PROFILE_IMAGE_CROPPER_SETTINGS.width = 300;
PROFILE_IMAGE_CROPPER_SETTINGS.height = 300;
PROFILE_IMAGE_CROPPER_SETTINGS.minWidth = 200;
PROFILE_IMAGE_CROPPER_SETTINGS.minHeight = 200;
PROFILE_IMAGE_CROPPER_SETTINGS.keepAspect = true;

const PROFILE_IMAGE_THUMBNAIL_RESIZE_SETTINGS: ResizeImageSettings = {
  side: Side.Height,
  size: BAND_PROFILE_THUMB_IMAGE_WIDTH
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
  @Output() profileImageAttached = new EventEmitter<ImagesUploadResults>();
  @Output() profileImageDelete = new EventEmitter<string>();
  @Output() imageAttached = new EventEmitter<ImagesUploadResults>();
  @Output() imageDelete = new EventEmitter<string>();

  isProfileImageLoading = false;
  isImageLoading = false;
  maxImages = MAX_BAND_IMAGES;

  profileImageCropperSettings = PROFILE_IMAGE_CROPPER_SETTINGS;
  profileImageResizeSettings = [BAND_IMAGE_RESIZE_SETTINGS, PROFILE_IMAGE_THUMBNAIL_RESIZE_SETTINGS];
  bandImageResizeSettings = [BAND_IMAGE_RESIZE_SETTINGS];


  ngOnInit() {
  }

  onProfileImageAttached(results: ImagesUploadResults) {
      this.profileImageAttached.emit(results);
  }

  onProfileImageDelete(imageUrl: string) {
    this.profileImageDelete.emit(imageUrl);
  }

  onImageAttached(results: ImagesUploadResults) {
    this.imageAttached.emit(results);
  }

  onImageDelete(imageUrl: string) {
    this.imageDelete.emit(imageUrl);
  }

  constructor() {

  }
}
