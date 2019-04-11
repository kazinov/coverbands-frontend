import { NgModule } from '@angular/core';
import { CreateBandComponent } from './create-band/create-band.component';
import { BandRoutingModule } from './band-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    BandRoutingModule
  ],
  declarations: [CreateBandComponent]
})
export class BandModule {
}