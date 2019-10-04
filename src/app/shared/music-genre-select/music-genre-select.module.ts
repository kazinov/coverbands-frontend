import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MusicGenreSelectComponent } from '@shared/music-genre-select/music-genre-select.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [MusicGenreSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    MusicGenreSelectComponent
  ]
})
export class MusicGenreSelectModule {
}
