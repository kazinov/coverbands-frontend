import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBandImagesComponent } from './edit-band-images.component';
import { FileUploadButtonModule } from '../../shared/file-upload-button/file-upload-button.module';

@NgModule({
  imports: [
    CommonModule,
    FileUploadButtonModule
  ],
  declarations: [
    EditBandImagesComponent
  ],
  exports: [
    EditBandImagesComponent
  ]
})
export class EditBandImagesModule {
}