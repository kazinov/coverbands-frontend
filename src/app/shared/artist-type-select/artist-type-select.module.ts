import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ArtistTypeSelectComponent } from '@shared/artist-type-select/artist-type-select.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [ArtistTypeSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    ArtistTypeSelectComponent
  ]
})
export class ArtistTypeSelectModule {
}
