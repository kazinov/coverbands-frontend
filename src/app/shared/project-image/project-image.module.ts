import { NgModule } from '@angular/core';
import { ProjectImageComponent } from '@shared/project-image/project-image.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectImageComponent
  ],
  exports: [
    ProjectImageComponent
  ]
})
export class ProjectImageModule {
}
