import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBandComponent } from './edit-band.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditArtistContactsModule } from '../edit-artist-contacts/edit-artist-contacts.module';
import { EditArtistLinksModule } from '../edit-artist-links/edit-artist-links.module';
import { EditArtistPricesModule } from '../edit-artist-prices/edit-artist-prices.module';
import { EditArtistCoversModule } from '../edit-artist-covers/edit-artist-covers.module';
import { EditArtistImagesModule } from '../edit-artist-images/edit-artist-images.module';
import { MainBandInfoModule } from '../edit-main-artist-info/main-band-info.module';

@NgModule({
  imports: [
    CommonModule,
    MainBandInfoModule,
    EditArtistContactsModule,
    EditArtistCoversModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    EditArtistLinksModule,
    EditArtistPricesModule,
    EditArtistImagesModule
  ],
  declarations: [
    EditBandComponent
  ],
  exports: [
    EditBandComponent
  ]
})
export class EditBandModule {
}