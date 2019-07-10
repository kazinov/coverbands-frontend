import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandContactsComponent } from './band-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {IMaskModule} from 'angular-imask';

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
    BandContactsComponent
  ],
  exports: [
    BandContactsComponent
  ]
})
export class BandContactsModule {
}