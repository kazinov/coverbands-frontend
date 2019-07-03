import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';
import { CropperSettings } from 'ngx-img-cropper';
import { FileHelper } from '../utils/file-helper';
import { map, take, takeUntil } from 'rxjs/operators';
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
    return FileHelper.readFileAsDataURL(image)
      .pipe(
        take(1),
        map((data: string) => {
          const dialogRef = this.dialog.open(ImageCropDialogComponent, {
            width: '600px',
            data: {
              fileData: data,
              cropperSettings: this.cropperSettings
            }
          });

          dialogRef.afterClosed().subscribe(result => {

            console.log('The dialog was closed', result);
          });
        }),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe();
  }

  get isMutlipleUploadEnabled() {
    return this.multipleUpload && !this.cropperSettings;
  }

  constructor(public dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
