import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PublishArtistDialogComponent } from '@artist-admin/publish-artist-dialog/publish-artist-dialog.component';
import { DeleteArtistDialogComponent } from '@artist-admin/delete-artist-dialog/delete-artist-dialog.component';
import { Artist } from '@core/artist/artist.model';

@Injectable()
export class ArtistAdminService {
  private publishDialogRef: MatDialogRef<PublishArtistDialogComponent>;
  private deleteDialogRef: MatDialogRef<DeleteArtistDialogComponent>;

  openPublishDialog() {
    this.closePublishDialog();
    this.publishDialogRef = this.dialog.open(PublishArtistDialogComponent);
    return this.publishDialogRef.afterClosed();
  }

  closePublishDialog() {
    if (this.publishDialogRef) {
      this.publishDialogRef.close();
      this.publishDialogRef = null;
    }
  }

  openDeleteDialog(artist: Artist) {
    this.closeDeleteDialog();
    this.deleteDialogRef = this.dialog.open(
      DeleteArtistDialogComponent,
      {
        data: {
          artist
        }
      }
      );
    return this.deleteDialogRef.afterClosed();
  }

  closeDeleteDialog() {
    if (this.deleteDialogRef) {
      this.deleteDialogRef.close();
      this.deleteDialogRef = null;
    }
  }

  constructor(private dialog: MatDialog) {

  }
}
