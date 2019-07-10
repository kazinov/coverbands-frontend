import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbeddedVideoComponent } from '@shared/embedded-video/embedded-video.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmbeddedVideoComponent],
  exports: [EmbeddedVideoComponent]
})
export class EmbeddedVideoModule { }
