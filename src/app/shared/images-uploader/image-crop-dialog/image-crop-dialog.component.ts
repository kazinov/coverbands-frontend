import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import { Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

export interface ImageCropDialogData {
  fileData: string;
  cropperSettings: CropperSettings;
}

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: 'image-crop-dialog.component.html',
  styleUrls: ['./image-crop-dialog.component.scss']
})
export class ImageCropDialogComponent implements OnInit, OnDestroy {
  imageData: { image?: string; } = {};
  ngUnsubscribe$ = new Subject<void>();
  @ViewChild('cropper', {static: true}) cropper: ImageCropperComponent;

  get cropperSettings() {
    return this.data && this.data.cropperSettings;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onLoadClick() {
    fetch(this.imageData.image)
      .then(res => res.blob())
      .then((blob) => {
        this.dialogRef.close(blob);
      });
  }

  ngOnInit(): void {
    this.setImage();
  }

  setImage(): Observable<void> {
    if (!this.data) {
      return;
    }
    const image = new Image();
    image.src = this.data.fileData;
    // cropper doesn't work without timeout
    const observable = timer(0)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        map(() => {
          this.cropper.setImage(image);
        }));
    observable.subscribe();
    return observable;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  constructor(
    public dialogRef: MatDialogRef<ImageCropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageCropDialogData) {
  }
}