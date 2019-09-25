import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ArtistAdminEffects } from '@artist-admin/artist-admin.effects';
import { ArtistAdminService } from '@artist-admin/artist-admin.service';
import { PublishArtistDialogComponent } from '@artist-admin/publish-artist-dialog/publish-artist-dialog.component';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { DeleteArtistDialogComponent } from '@artist-admin/delete-artist-dialog/delete-artist-dialog.component';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      ArtistAdminEffects
    ]),
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    PublishArtistDialogComponent,
    DeleteArtistDialogComponent
  ],
  entryComponents: [
    PublishArtistDialogComponent,
    DeleteArtistDialogComponent
  ],
  providers: [
    ArtistAdminService
  ]
})
export class ArtistAdminEffectsModule {
  constructor(@Optional() @SkipSelf() parentModule?: ArtistAdminEffectsModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
