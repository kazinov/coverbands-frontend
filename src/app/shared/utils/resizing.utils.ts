import * as pica from 'pica';
import { FileHelper } from './file-helper';
import { from, Observable, of, Subject } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

export const picaInstance = pica({features: ['js']});

function toOnloadObservable(image: HTMLImageElement) {
  const subject = new Subject<Event>();
  image.onload = (event: Event) => {
    subject.next(event);
    subject.complete();
  };
  image.onerror = (event: Event) => {
    subject.error(event);
    subject.complete();
  };
  return subject;
}

export enum Side {
  Width,
  Height
}

export interface ResizeImageSettings {
  side: Side,
  size: number;
}

export function resizeImage(
  image: File,
  dataUrl: string,
  setting: ResizeImageSettings
): Observable<File> {

  const sourceImg: HTMLImageElement = document.createElement('img');
  sourceImg.classList.add('resizing-image-from');
  sourceImg.setAttribute('hidden', 'hidden');
  const sourceCanvas = document.createElement('canvas');
  sourceCanvas.classList.add('resizing-canvas-to');
  sourceCanvas.setAttribute('hidden', 'hidden');

  return (dataUrl
    ? of(dataUrl)
    : FileHelper.readFileAsDataURL(image))
    .pipe(
      switchMap((dataUrl: string) => {
        sourceImg.setAttribute('src', dataUrl);
        document.body.appendChild(sourceImg);
        return toOnloadObservable(sourceImg);
      }),
      switchMap(() => {
        document.body.appendChild(sourceCanvas);

        if ((setting.side === Side.Width && sourceImg.width <= setting.size)
          || (setting.side === Side.Height && sourceImg.height <= setting.size)) {
          console.error('no need to resize')
          return of(image);
        }

        const canvasWidth = setting.side === Side.Width
          ? setting.size
          : (setting.size / sourceImg.height) * sourceImg.width;
        const canvasHeight = setting.side === Side.Height
          ? setting.size
          : (setting.size / sourceImg.width) * sourceImg.height;
        sourceCanvas.setAttribute('width', canvasWidth + '');
        sourceCanvas.setAttribute('height', canvasHeight + '');

        return from(picaInstance.resize(sourceImg, sourceCanvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 150
        }))
          .pipe(
            switchMap((result) => {
              return from(picaInstance.toBlob(result, 'image/jpeg', 1));
            }),
            map((blob: Blob) => {
              return new File([blob], image.name)
            }),
          );
      }),
      finalize(() => {
        sourceImg.remove();
        sourceCanvas.remove();
      })
    );
}