import { Bounds, CropperSettings } from 'ngx-img-cropper';
import { CroppingArea } from '../types/cropping-area';

export const IMAGE_CROPPER_DEFAULT_FILE_TYPE = 'image/jpeg';
export class ImageCropperHelper {
  static getDefaultCropperSettings() {
    const settings = new CropperSettings();
    settings.minWidth = 30;
    settings.minHeight = 30;
    settings.width = 200;
    settings.height = 100;
    settings.canvasWidth = 300;
    settings.canvasHeight = 200;
    settings.touchRadius = 20;
    settings.keepAspect = false;
    settings.fileType = IMAGE_CROPPER_DEFAULT_FILE_TYPE;
    const cropperColor = 'rgba(63, 81, 181, 0.8)';
    const fillColor = 'rgba(0, 0, 0, 0.8)';
    settings.cropperDrawSettings = {
      strokeWidth: 1,
      dragIconStrokeWidth: 1,
      strokeColor: cropperColor,
      dragIconStrokeColor: cropperColor,
      dragIconFillColor: cropperColor,
      fillColor: cropperColor,
      backgroundFillColor: fillColor,
      lineDash: false
    };
    settings.noFileInput = true;
    return settings;
  }

  static parseCropperBounds(cropperBounds: Bounds): CroppingArea {
    return {
      x_offset: cropperBounds.left,
      y_offset: cropperBounds.top,
      width: cropperBounds.width,
      height: cropperBounds.height
    };
  }
}
