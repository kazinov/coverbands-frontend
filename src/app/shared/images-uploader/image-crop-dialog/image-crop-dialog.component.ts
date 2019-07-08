import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FileHelper } from '../../utils/file-helper';
import { tap } from 'rxjs/internal/operators/tap';
import { CropperSettings } from '../../image-cropper/cropper-settings';
import { ImageCropperComponent } from '../../image-cropper/image-cropper.component';

export interface ImageCropDialogData {
  file: File;
  cropperSettings: CropperSettings;
}

export interface ImageCropDialogResult {
  file: File;
  dataUrl: string;
}

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: 'image-crop-dialog.component.html',
  styleUrls: ['./image-crop-dialog.component.scss']
})
export class ImageCropDialogComponent implements OnInit, OnDestroy {
  imageData: { image?: string; } = {};
  ngUnsubscribe$ = new Subject<void>();
  isLoading = false;
  @ViewChild('cropper', {static: true}) cropper: ImageCropperComponent;

  get cropperSettings() {
    return this.data && this.data.cropperSettings;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onLoadClick() {
    fetch(
      this.cropper.cropper.getCroppedImage(true).src
    )
      .then(res => res.blob())
      .then((blob) => {
        this.dialogRef.close(
          {
            file: new File([blob], this.data.file.name),
            dataUrl: this.imageData.image
          } as ImageCropDialogResult

        );
      });
  }

  ngOnInit(): void {
    this.setImage();
  }

  setImage() {
    if (!this.data) {
      return;
    }

    this.isLoading = true;
    FileHelper.readFileAsDataURL(this.data.file)
      .pipe(
        take(1),
        tap((data: string) => {
          const image = new Image();
          image.src = data;
          this.cropper.setImage(image);
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  constructor(
    public dialogRef: MatDialogRef<ImageCropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageCropDialogData,
    private changeDetectorRef: ChangeDetectorRef) {
  }
}