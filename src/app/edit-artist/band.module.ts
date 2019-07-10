import { NgModule } from '@angular/core';
import { BandRoutingModule } from './band-routing.module';
import { CommonModule } from '@angular/common';
import { CreateBandModule } from './create-band/create-band.module';
import { EditBandModule } from './edit-band/edit-band.module';

@NgModule({
  imports: [
    CommonModule,
    BandRoutingModule,
    CreateBandModule,
    EditBandModule
  ]
})
export class BandModule {
}