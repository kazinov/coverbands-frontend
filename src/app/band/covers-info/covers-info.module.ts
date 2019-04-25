import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { CoversInfoComponent } from '../covers-info/covers-info.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  declarations: [
    CoversInfoComponent
  ],
  exports: [
    CoversInfoComponent
  ]
})
export class CoversInfoModule {
}