import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBandInfoModule } from '../main-band-info/main-band-info.module';
import { EditBandComponent } from './edit-band.component';
import { MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';
import { CoversInfoModule } from '../covers-info/covers-info.module';
import { BandContactsModule } from '../band-contacts/band-contacts.module';
import { BandLinksModule } from '../band-links/band-links.module';
import { BandPricesModule } from '../band-prices/band-prices.module';
import { EditBandImagesModule } from '../edit-band-images/edit-band-images.module';

@NgModule({
  imports: [
    CommonModule,
    MainBandInfoModule,
    BandContactsModule,
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