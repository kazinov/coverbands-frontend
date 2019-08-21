import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesUploaderModule } from '@shared/images-uploader/images-uploader.module';
import { EditArtistImagesComponent } from './edit-artist-images.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ImagesUploaderModule,
    MatButtonModule,
  ],
  declarations: [
    EditArtistImagesComponent
  ],
  exports: [
    EditArtistImagesComponent
  ]
})
export class EditArtistImagesModule {
}
