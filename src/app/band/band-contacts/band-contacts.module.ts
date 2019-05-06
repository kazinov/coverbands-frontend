import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandContactsComponent } from './band-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
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