import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBandComponent } from './create-band.component';
import { EditMainArtistInfoModule } from '../edit-main-artist-info/edit-main-artist-info.module';

@NgModule({
  imports: [
    CommonModule,
    EditMainArtistInfoModule
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