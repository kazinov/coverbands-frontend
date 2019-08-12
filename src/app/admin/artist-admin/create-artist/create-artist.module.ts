import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtistComponent } from './create-artist.component';
import { EditArtistMainInfoModule } from '../edit-artist/edit-artist-main-info/edit-artist-main-info.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    CommonModule,
    EditArtistMainInfoModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    CreateArtistComponent
  ],
  exports: [
    CreateArtistComponent
  ]
})
export class CreateArtistModule {
}
