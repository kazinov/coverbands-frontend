import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBandInfoModule } from '../main-band-info/main-band-info.module';
import { EditBandComponent } from './edit-band.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditBandImagesModule } from '../edit-band-images/edit-band-images.module';
import { EditArtistContactsModule } from '../edit-artist-contacts/edit-artist-contacts.module';
import { EditArtistLinksModule } from '../edit-artist-links/edit-artist-links.module';
import { EditArtistPricesModule } from '../edit-artist-prices/edit-artist-prices.module';
import { CoversInfoModule } from '../edit-artist-covers/covers-info.module';

@NgModule({
  imports: [
    CommonModule,
    MainBandInfoModule,
    EditArtistContactsModule,
    CoversInfoModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    EditArtistLinksModule,
    EditArtistPricesModule,
    EditBandImagesModule
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