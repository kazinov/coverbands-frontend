import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArtistModule } from './edit-artist/edit-artist.module';
import { CreateArtistModule } from './create-artist/create-artist.module';
import { ArtistAdminRoutingModule } from './artist-admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ArtistAdminRoutingModule,
    CreateArtistModule,
    EditArtistModule
  ]
})
export class ArtistAdminModule {
}