import { NgModule } from '@angular/core';
import { BandRoutingModule } from './band-routing.module';
import { CommonModule } from '@angular/common';
import { EditArtistModule } from './edit-artist/edit-artist.module';
import { CreateArtistModule } from './create-artist/create-artist.module';

@NgModule({
  imports: [
    CommonModule,
    BandRoutingModule,
    CreateArtistModule,
    EditArtistModule
  ]
})
export class BandModule {
}