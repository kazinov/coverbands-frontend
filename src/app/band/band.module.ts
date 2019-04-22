import { NgModule } from '@angular/core';
import { CreateBandComponent } from './create-band/create-band.component';
import { BandRoutingModule } from './band-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MainBandInfoComponent } from './main-band-info/main-band-info.component';

@NgModule({
  imports: [
    CommonModule,
    BandRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  declarations: [
    CreateBandComponent,
    MainBandInfoComponent
  ]
})
export class BandModule {
}