import { CroppingArea } from '../types/cropping-area';
import { CropperSettings } from '../image-cropper/cropper-settings';
import { Bounds } from '../image-cropper/model';

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
    settings.preserveSize = true;
    settings.cropOnResize = false;
    const fillColor = 'rgba(0, 0, 0, 0.8)';
    const cropperColor = 'rgba(63, 81, 181, 0.8)';
    const strokeColor = 'rgba(255, 255, 255, 1)';
    settings.cropperDrawSettings = {
      strokeWidth: 1,
      dragIconStrokeWidth: 1,
      strokeColor,
      dragIconStrokeColor: strokeColor,
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
