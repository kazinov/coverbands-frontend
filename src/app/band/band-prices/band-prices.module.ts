import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule } from '@angular/material';
import {IMaskModule} from 'angular-imask';
import { BandPricesComponent } from './band-prices.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    IMaskModule,
    MatTableModule,
    MatIconModule
  ],
  declarations: [
    BandPricesComponent
  ],
  exports: [
    BandPricesComponent
  ]
})
export class BandPricesModule {
}