import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArtistMainInfoModule } from '../edit-artist-main-info/edit-artist-main-info.module';
import { CreateArtistComponent } from './create-artist.component';

@NgModule({
  imports: [
    CommonModule,
    EditArtistMainInfoModule
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