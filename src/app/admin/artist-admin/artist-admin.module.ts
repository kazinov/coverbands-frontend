import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtistModule } from './create-artist/create-artist.module';
import { ArtistAdminRoutingModule } from './artist-admin-routing.module';
import { EditArtistModule } from './edit-artist/edit-artist/edit-artist.module';
import { EffectsModule } from '@ngrx/effects';
import { ArtistAdminEffects } from '@artist-admin/artist-admin.effects';

@NgModule({
  imports: [
    CommonModule,
    ArtistAdminRoutingModule,
    CreateArtistModule,
    EditArtistModule,
    EffectsModule.forFeature([
      ArtistAdminEffects
    ]),
  ]
})
export class ArtistAdminModule {
}
