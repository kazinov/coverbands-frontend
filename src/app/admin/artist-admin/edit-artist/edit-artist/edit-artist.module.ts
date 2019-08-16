import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditArtistContactsModule } from '../edit-artist-contacts/edit-artist-contacts.module';
import { EditArtistLinksModule } from '../edit-artist-links/edit-artist-links.module';
import { EditArtistPricesModule } from '../edit-artist-prices/edit-artist-prices.module';
import { EditArtistCoversModule } from '../edit-artist-covers/edit-artist-covers.module';
import { EditArtistImagesModule } from '../edit-artist-images/edit-artist-images.module';
import { EditArtistComponent } from './edit-artist.component';
import { EditArtistMainInfoModule } from '../edit-artist-main-info/edit-artist-main-info.module';
import { EditArtistVideosModule } from '@artist-admin/edit-artist/edit-artist-videos/edit-artist-videos.module';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    EditArtistMainInfoModule,
    EditArtistContactsModule,
    EditArtistCoversModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    EditArtistLinksModule,
    EditArtistPricesModule,
    EditArtistImagesModule,
    EditArtistVideosModule,
    MatListModule
  ],
  declarations: [
    EditArtistComponent
  ],
  exports: [
    EditArtistComponent
  ]
})
export class EditArtistModule {
}
