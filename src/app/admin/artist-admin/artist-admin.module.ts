import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtistModule } from './create-artist/create-artist.module';
import { ArtistAdminRoutingModule } from './artist-admin-routing.module';
import { EditArtistModule } from './edit-artist/edit-artist/edit-artist.module';
import { ArtistListModule } from '@artist-admin/artist-list/artist-list.module';

@NgModule({
  imports: [
    CommonModule,
    ArtistAdminRoutingModule,
    CreateArtistModule,
    EditArtistModule,
    ArtistListModule,
  ],
  providers: []
})
export class ArtistAdminModule {
  constructor(@Optional() @SkipSelf() parentModule?: ArtistAdminModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
