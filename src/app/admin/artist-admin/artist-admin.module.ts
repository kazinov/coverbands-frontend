import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtistModule } from './create-artist/create-artist.module';
import { ArtistAdminRoutingModule } from './artist-admin-routing.module';
import { EditArtistModule } from './edit-artist/edit-artist/edit-artist.module';
import { EffectsModule } from '@ngrx/effects';
import { ArtistAdminEffects } from '@artist-admin/artist-admin.effects';
import { ArtistAdminService } from '@artist-admin/artist-admin.service';

@NgModule({
  imports: [
    CommonModule,
    ArtistAdminRoutingModule,
    CreateArtistModule,
    EditArtistModule,
    EffectsModule.forFeature([
      ArtistAdminEffects
    ]),
  ],
  providers: [
    ArtistAdminService
  ]
})
export class ArtistAdminModule {
  constructor(@Optional() @SkipSelf() parentModule?: ArtistAdminModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
