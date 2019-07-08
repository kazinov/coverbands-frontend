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
  Height,
  Max
}

export interface ResizeImageSettings {
  side: Side,
  size: number;
}

interface Sizes {
  width: number;
  height: number;
}

function getSizesBySide(byHeight: boolean, size: number, sourceWidth, sourceHeight): Sizes {
  if (byHeight) {
    return {
      width: (size / sourceHeight) * sourceWidth,
      height: size
    };
  } else {
    return {
      width: size,
      height: (size / sourceWidth) * sourceHeight,
    };
  }
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
          || (setting.side === Side.Height && sourceImg.height <= setting.size)
          || (setting.side === Side.Max && sourceImg.height <= setting.size && sourceImg.width <= setting.size)) {
          console.error('no need to resize')
          return of(image);
        }

        let sizes: Sizes;

        switch (setting.side) {
          case Side.Height:
            sizes = getSizesBySide(true, setting.size, sourceImg.width, sourceImg.height);
            break;
          case Side.Width:
            sizes = getSizesBySide(false, setting.size, sourceImg.width, sourceImg.height);
            break;
          case Side.Max:
            if (sourceImg.height > sourceImg.width) {
              sizes = getSizesBySide(true, setting.size, sourceImg.width, sourceImg.height);
            } else {
              sizes = getSizesBySide(false, setting.size, sourceImg.width, sourceImg.height);
            }
            break;
        }

        sourceCanvas.setAttribute('width', sizes.width + '');
        sourceCanvas.setAttribute('height', sizes.height + '');

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