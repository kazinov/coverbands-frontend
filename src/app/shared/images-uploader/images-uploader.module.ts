import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesUploaderComponent } from './images-uploader.component';
import { FileUploadButtonModule } from '../file-upload-button/file-upload-button.module';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    ImagesUploaderComponent,
    ImageCropDialogComponent
  ],
  exports: [ImagesUploaderComponent],
  entryComponents: [
    ImageCropDialogComponent
  ]
})
export class ImagesUploaderModule { }


