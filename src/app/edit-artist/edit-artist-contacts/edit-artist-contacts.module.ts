import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {IMaskModule} from 'angular-imask';
import { EditArtistContactsComponent } from './edit-artist-contacts.component';

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
    EditArtistContactsComponent
  ],
  exports: [
    EditArtistContactsComponent
  ]
})
export class EditArtistContactsModule {
}