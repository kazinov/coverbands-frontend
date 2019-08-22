import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PublishArtistDialogComponent } from '@artist-admin/publish-artist-dialog/publish-artist-dialog.component';

@Injectable()
export class ArtistAdminService {
  private publishDialogRef: MatDialogRef<PublishArtistDialogComponent>;

  openAuthDialog() {
    this.publishDialogRef = this.dialog.open(PublishArtistDialogComponent);
    return this.publishDialogRef.afterClosed();
  }

  closeAuthDialog() {
    if (this.publishDialogRef) {
      this.publishDialogRef.close();
    }
  }

  constructor(private dialog: MatDialog) {

  }
}
