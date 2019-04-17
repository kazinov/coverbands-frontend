import { NgModule } from '@angular/core';
import { CreateBandComponent } from './create-band/create-band.component';
import { BandRoutingModule } from './band-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BandRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [CreateBandComponent]
})
export class BandModule {
}