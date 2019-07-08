import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageCropDialogComponent, ImageCropDialogData } from './image-crop-dialog/image-crop-dialog.component';
import { CropperSettings } from 'ngx-img-cropper';
import { Subject } from 'rxjs';

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
  @Output() imagesAttached = new EventEmitter<File[]>();
  @Output() imageDelete = new EventEmitter<string>();
  ngUnsubscribe$ = new Subject<void>();
  croppingDialogRef: MatDialogRef<any>;

  get maxImagesReached() {
    return !!this.max && this.imagesUrls && this.imagesUrls.length >= this.max;
  }

  ngOnInit() {

  }

  onImagesAttached(images: File[]) {
    if (this.cropperSettings && images.length) {
      this.openCroppingDialog(images[0]);
    } else {
      this.imagesAttached.emit(images);
    }
  }

  openCroppingDialog(image: File) {
    this.croppingDialogRef = this.dialog.open(ImageCropDialogComponent, {
      width: '600px',
      data: {
        file: image,
        cropperSettings: this.cropperSettings
      } as ImageCropDialogData
    });

    this.croppingDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imagesAttached.emit([result]);
      }
    });
  }

  get isMutlipleUploadEnabled() {
    return this.multipleUpload && !this.cropperSettings;
  }

  constructor(public dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    if (this.croppingDialogRef) {
      this.croppingDialogRef.close();
    }
  }
}
