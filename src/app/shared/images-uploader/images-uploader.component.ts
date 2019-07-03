import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrls: ['./images-uploader.component.scss']
})
export class ImagesUploaderComponent implements OnInit {
  @Input() imagesUrls: string[];
  @Input() multipleUpload = false;
  @Input() max = 0;
  @Input() isLoading = false;
  @Output() imagesAttached = new EventEmitter<File[]>();
  @Output() imageDelete = new EventEmitter<string>();

  get maxImagesReached() {
    return !!this.max && this.imagesUrls && this.imagesUrls.length >= this.max;
  }

  ngOnInit() {

  }

  onImagesAttached(images: File[]) {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ImageCropDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  constructor(public dialog: MatDialog) {
  }
}
