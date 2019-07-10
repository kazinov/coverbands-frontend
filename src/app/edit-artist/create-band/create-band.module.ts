import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBandComponent } from './create-band.component';
import { EditArtistMainInfoModule } from '../edit-artist-main-info/edit-artist-main-info.module';

@NgModule({
  imports: [
    CommonModule,
    EditArtistMainInfoModule
  ],
  declarations: [
    CreateBandComponent
  ],
  exports: [
    CreateBandComponent
  ]
})
export class CreateBandModule {
}