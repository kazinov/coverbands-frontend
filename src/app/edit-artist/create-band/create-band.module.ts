import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBandComponent } from './create-band.component';
import { MainBandInfoModule } from '../edit-main-artist-info/main-band-info.module';

@NgModule({
  imports: [
    CommonModule,
    MainBandInfoModule
  ],
  declarations: [
    CreateBandComponent
  ],
  exports: [
    CreateBandComponent
  ]
})
export class CreateBandModule {
}