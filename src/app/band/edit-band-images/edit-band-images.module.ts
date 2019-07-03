import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBandImagesComponent } from './edit-band-images.component';
import { ImagesUploaderModule } from '../../shared/images-uploader/images-uploader.module';

@NgModule({
  imports: [
    CommonModule,
    ImagesUploaderModule
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