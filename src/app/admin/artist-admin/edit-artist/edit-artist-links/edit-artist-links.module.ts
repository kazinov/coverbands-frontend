import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { IMaskModule } from 'angular-imask';
import { EditArtistLinksComponent } from './edit-artist-links.component';

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
    EditArtistLinksComponent
  ],
  exports: [
    EditArtistLinksComponent
  ]
})
export class EditArtistLinksModule {
}
