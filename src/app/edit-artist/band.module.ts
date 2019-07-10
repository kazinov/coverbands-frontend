import { NgModule } from '@angular/core';
import { BandRoutingModule } from './band-routing.module';
import { CommonModule } from '@angular/common';
import { EditArtistModule } from './edit-artist/edit-artist.module';
import { CreateBandModule } from './create-artist/create-band.module';

@NgModule({
  imports: [
    CommonModule,
    BandRoutingModule,
    CreateBandModule,
    EditArtistModule
  ]
})
export class BandModule {
}