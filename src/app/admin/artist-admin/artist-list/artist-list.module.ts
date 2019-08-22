import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from '@artist-admin/artist-list/artist-list.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ArtistListComponent
  ],
  exports: [
    ArtistListComponent
  ]
})
export class ArtistListModule {
}
