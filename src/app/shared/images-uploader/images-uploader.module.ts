import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesUploaderComponent } from './images-uploader.component';
import { FileUploadButtonModule } from '../file-upload-button/file-upload-button.module';

@NgModule({
  imports: [
    CommonModule,
    FileUploadButtonModule
  ],
  declarations: [ImagesUploaderComponent],
  exports: [ImagesUploaderComponent]
})
export class ImagesUploaderModule { }


