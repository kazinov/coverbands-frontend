import { NgModule } from '@angular/core';
import { BandRoutingModule } from './band-routing.module';
import { CommonModule } from '@angular/common';
import { CreateBandModule } from './create-band/create-band.module';
import { EditArtistModule } from './edit-artist/edit-artist.module';

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