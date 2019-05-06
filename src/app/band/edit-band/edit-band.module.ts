import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBandInfoModule } from '../main-band-info/main-band-info.module';
import { EditBandComponent } from './edit-band.component';
import { MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';
import { CoversInfoModule } from '../covers-info/covers-info.module';
import { BandContactsModule } from '../band-contacts/band-contacts.module';

@NgModule({
  imports: [
    CommonModule,
    MainBandInfoModule,
    BandContactsModule,
    CoversInfoModule,
    MatExpansionModule,
    MatProgressSpinnerModule
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