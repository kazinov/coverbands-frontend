import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandRoutingModule } from '../band-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { CreateBandComponent } from '../create-band/create-band.component';
import { EditBandComponent } from '../edit-band/edit-band.component';
import { MainBandInfoComponent } from './main-band-info.component';
import { CoversInfoComponent } from '../covers-info/covers-info.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  declarations: [
    MainBandInfoComponent
  ],
  exports: [
    MainBandInfoComponent
  ]
})
export class MainBandInfoModule {
}