import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import {IMaskModule} from 'angular-imask';
import { BandLinksComponent } from './band-links.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    IMaskModule,
    MatTableModule
  ],
  declarations: [
    BandLinksComponent
  ],
  exports: [
    BandLinksComponent
  ]
})
export class BandLinksModule {
}