import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCropperHelper } from '@shared/utils/image-cropper-helper';
import { ResizeImageSettings, Side } from '@shared/utils/resizing.utils';
import { ImagesUploadResults } from '@shared/images-uploader/images-uploader.component';
import { Artist } from '@core/artist/artist.model';
import { TRANSLATIONS } from '@core/translation/translations';

const BAND_PROFILE_THUMB_IMAGE_WIDTH = 200;
const BAND_IMAGE_HEIGHT = 600;

const PROFILE_IMAGE_CROPPER_SETTINGS = ImageCropperHelper.getDefaultCropperSettings();
PROFILE_IMAGE_CROPPER_SETTINGS.canvasWidth = 600;
PROFILE_IMAGE_CROPPER_SETTINGS.canvasHeight = 300;
PROFILE_IMAGE_CROPPER_SETTINGS.width = 300;
PROFILE_IMAGE_CROPPER_SETTINGS.height = 300;
PROFILE_IMAGE_CROPPER_SETTINGS.minWidth = 200;
PROFILE_IMAGE_CROPPER_SETTINGS.minHeight = 200;
PROFILE_IMAGE_CROPPER_SETTINGS.keepAspect = true;

const PROFILE_IMAGE_THUMBNAIL_RESIZE_SETTINGS: ResizeImageSettings = {
  side: Side.Width,
  size: BAND_PROFILE_THUMB_IMAGE_WIDTH
};

const BAND_IMAGE_RESIZE_SETTINGS: ResizeImageSettings = {
  side: Side.Max,
  size: BAND_IMAGE_HEIGHT
};

export const MAX_BAND_IMAGES = 5;

export interface ProfileImageUploadResults {
  image: File;
  thumb: File;
}

@Component({
  selector: 'app-edit-artist-images',
  templateUrl: './edit-artist-images.component.html',
  styleUrls: ['./edit-artist-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistImagesComponent implements OnInit {
  @Input() artist: Artist;
  @Input() showNextButton: boolean;
  @Output() profileImageAttached = new EventEmitter<ProfileImageUploadResults>();
  @Output() imageAttached = new EventEmitter<File>();
  @Output() imageDelete = new EventEmitter<string>();
  @Output() nextButtonClick = new EventEmitter();

  t = TRANSLATIONS;
  isProfileImageLoading = false;
  isImageLoading = false;
  maxImages = MAX_BAND_IMAGES;

  profileImageCropperSettings = PROFILE_IMAGE_CROPPER_SETTINGS;
  profileImageResizeSettings = [BAND_IMAGE_RESIZE_SETTINGS, PROFILE_IMAGE_THUMBNAIL_RESIZE_SETTINGS];
  bandImageResizeSettings = [BAND_IMAGE_RESIZE_SETTINGS];


  ngOnInit() {
  }

  onProfileImageAttached(results: ImagesUploadResults) {
      this.profileImageAttached.emit({
        image: results.imageVersions[0],
        thumb: results.imageVersions[1]
      });
  }

  onImageAttached(results: ImagesUploadResults) {
    this.imageAttached.emit(results.imageVersions[0]);
  }

  onImageDelete(imageUrl: string) {
    this.imageDelete.emit(imageUrl);
  }

  constructor() {

  }
}
