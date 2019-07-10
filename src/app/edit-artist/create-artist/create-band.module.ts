import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArtistMainInfoModule } from '../edit-artist-main-info/edit-artist-main-info.module';
import { CreateBandComponent } from './create-band.component';

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