import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBandInfoModule } from '../main-band-info/main-band-info.module';
import { EditBandComponent } from './edit-band.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoversInfoModule } from '../covers-info/covers-info.module';
import { BandLinksModule } from '../band-links/band-links.module';
import { BandPricesModule } from '../band-prices/band-prices.module';
import { EditBandImagesModule } from '../edit-band-images/edit-band-images.module';
import { EditArtistContactsModule } from '../edit-artist-contacts/edit-artist-contacts.module';

@NgModule({
  imports: [
    CommonModule,
    MainBandInfoModule,
    EditArtistContactsModule,
    CoversInfoModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    BandLinksModule,
    BandPricesModule,
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