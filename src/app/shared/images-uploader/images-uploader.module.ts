import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesUploaderComponent } from './images-uploader.component';
import { FileUploadButtonModule } from '../file-upload-button/file-upload-button.module';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FileUploadButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [ImagesUploaderComponent],
  exports: [ImagesUploaderComponent]
})
export class ImagesUploaderModule { }


