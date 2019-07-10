import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtistModule } from './create-artist/create-artist.module';
import { ArtistAdminRoutingModule } from './artist-admin-routing.module';
import { EditArtistModule } from './edit-artist/edit-artist/edit-artist.module';

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