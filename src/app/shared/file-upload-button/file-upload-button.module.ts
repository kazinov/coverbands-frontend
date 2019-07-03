import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadButtonComponent } from './file-upload-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FileUploadButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [FileUploadButtonComponent]
})
export class FileUploadButtonModule { }
