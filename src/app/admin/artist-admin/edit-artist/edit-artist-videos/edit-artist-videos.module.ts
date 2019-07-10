import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { IMaskModule } from 'angular-imask';
import { EditArtistVideosComponent } from '@artist-admin/edit-artist/edit-artist-videos/edit-artist-videos.component';

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
    EditArtistVideosComponent
  ],
  exports: [
    EditArtistVideosComponent
  ]
})
export class EditArtistVideosModule {
}
