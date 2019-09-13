import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from '@artist-admin/artist-list/artist-list.component';
import { ArtistListSelectors } from '@artist-admin/artist-list/artist-list.selectors';
import { MatButtonModule, MatIconModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { ProjectImageModule } from '@shared/project-image/project-image.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    ProjectImageModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ArtistListComponent
  ],
  exports: [
    ArtistListComponent
  ],
  providers: [
    ArtistListSelectors
  ]
})
export class ArtistListModule {
  constructor(@Optional() @SkipSelf() parentModule?: ArtistListModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
