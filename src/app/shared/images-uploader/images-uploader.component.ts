import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageCropDialogComponent, ImageCropDialogData } from './image-crop-dialog/image-crop-dialog.component';
import { CropperSettings } from 'ngx-img-cropper';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { resizeImage, ResizeImageSettings } from '../utils/resizing.utils';

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrls: ['./images-uploader.component.scss']
})
export class ImagesUploaderComponent implements OnInit, OnDestroy {
  @Input() imagesUrls: string[];
  @Input() multipleUpload = false;
  @Input() max = 0;
  @Input() isLoading = false;
  @Input() cropperSettings: CropperSettings;
  @Input() resizeSettings: ResizeImageSettings;
  @Output() imageAttached = new EventEmitter<File>();
  @Output() imageDelete = new EventEmitter<string>();
  ngUnsubscribe$ = new Subject<void>();
  croppingDialogRef: MatDialogRef<any>;
  isResizing = false;

  get maxImagesReached() {
    return !!this.max && this.imagesUrls && this.imagesUrls.length >= this.max;
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
      this.resizeImage(images[0], (resizedImage: File) => {
        this.imageAttached.emit(resizedImage);
      });
    }
  }

  resizeImage(image: File, onResized: (resized: File) => void) {
    this.isResizing = true;
    resizeImage(image, this.resizeSettings)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        catchError((error) => {
          console.error('resizing error', error);
          return of();
        })
      )
      .subscribe((resizedImage: File) => {
        this.isResizing = false;
        onResized(resizedImage);
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

    this.croppingDialogRef.afterClosed().subscribe((result: File) => {
      if (result) {
        this.resizeImage(result, (resizedImage: File) => {
          this.imageAttached.emit(resizedImage);
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
