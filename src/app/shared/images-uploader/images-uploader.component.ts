import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ImageCropDialogComponent,
  ImageCropDialogData,
  ImageCropDialogResult
} from './image-crop-dialog/image-crop-dialog.component';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { resizeImage, ResizeImageSettings } from '../utils/resizing.utils';
import { CropperSettings } from '../image-cropper/cropper-settings';

export interface ImagesUploadResults {
  imageVersions: File[];
}

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrls: ['./images-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesUploaderComponent implements OnInit, OnDestroy {
  @Input() imagesUrls: string[];
  @Input() max = 0;
  @Input() isLoading = false;
  @Input() onlyReplacing = false;
  @Input() cropperSettings: CropperSettings;
  @Input() resizeSettings: ResizeImageSettings[];
  @Output() imageAttached = new EventEmitter<ImagesUploadResults>();
  @Output() imageDelete = new EventEmitter<string>();
  ngUnsubscribe$ = new Subject<void>();
  croppingDialogRef: MatDialogRef<any>;
  isResizing = false;
  multipleUpload = false;

  get maxImagesReached() {
    return !!this.max && this.imagesUrls && this.imagesUrls.length >= this.max;
  }

  get someImages() {
    return this.imagesUrls && !!this.imagesUrls.length;
  }

  ngOnInit() {
  }

  onImagesAttached(images: File[]) {
    if (!images.length) {
      return;
    }

    if (this.cropperSettings) {
      this.openCroppingDialog(images[0]);
    } else {
      this.resizeImage(images[0], null, (resizedImages: File[]) => {
        this.imageAttached.emit({
          imageVersions: resizedImages
        });
      });
    }
  }

  resizeImage(image: File, dataUrl: string, onResized: (resized: File[]) => void) {
    this.isResizing = true;
    this.changeDetectorRef.markForCheck();

    const resizeObservables = this.resizeSettings
      .map((settings) => resizeImage(image, dataUrl, settings));

    forkJoin(...resizeObservables)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        catchError((error) => {
          console.error('resizing error', error);
          return of();
        })
      )
      .subscribe((resizedImages: File[]) => {
        this.isResizing = false;
        onResized(resizedImages);
        this.changeDetectorRef.markForCheck();
      });
  }

  openCroppingDialog(image: File) {
    this.croppingDialogRef = this.dialog.open(ImageCropDialogComponent, {
      width: '600px',
      data: {
        file: image,
        cropperSettings: this.cropperSettings
      } as ImageCropDialogData
    });

    this.croppingDialogRef.afterClosed().subscribe((result: ImageCropDialogResult) => {
      if (result) {
        this.resizeImage(result.file, result.dataUrl, (resizedImages: File[]) => {
          this.imageAttached.emit({
            imageVersions: resizedImages
          });
        });
      }
    });
  }

  get showSpinner() {
    return this.isLoading || this.isResizing;
  }

  get isMutlipleUploadEnabled() {
    return this.multipleUpload && !this.cropperSettings;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    if (this.croppingDialogRef) {
      this.croppingDialogRef.close();
    }
  }

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) {
  }
}
