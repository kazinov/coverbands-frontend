import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesUploaderComponent } from './images-uploader.component';
import { FileUploadButtonModule } from '../file-upload-button/file-upload-button.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';
import { ImageCropperModule } from '../image-cropper/image-cropper.module';
import { ProjectImageModule } from '@shared/project-image/project-image.module';

@NgModule({
  imports: [
    CommonModule,
    FileUploadButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    ImageCropperModule,
    ProjectImageModule
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


