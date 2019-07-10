import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtistComponent } from './create-artist.component';
import { EditArtistMainInfoModule } from '../edit-artist/edit-artist-main-info/edit-artist-main-info.module';

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