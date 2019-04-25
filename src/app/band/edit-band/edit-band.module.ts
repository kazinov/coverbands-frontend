import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBandInfoModule } from '../main-band-info/main-band-info.module';
import { EditBandComponent } from './edit-band.component';
import { MatTabsModule } from '@angular/material';
import { CoversInfoModule } from '../covers-info/covers-info.module';

@NgModule({
  imports: [
    CommonModule,
    MainBandInfoModule,
    MatTabsModule,
    CoversInfoModule
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