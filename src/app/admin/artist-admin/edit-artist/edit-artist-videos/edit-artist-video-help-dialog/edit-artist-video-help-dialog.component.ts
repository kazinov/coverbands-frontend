import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-artist-video-help-dialog',
  templateUrl: 'edit-artist-video-help-dialog.component.html',
  styleUrls: ['./edit-artist-video-help-dialog.component.scss']
})
export class EditArtistVideoHelpDialogComponent {
  onCloseClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<EditArtistVideoHelpDialogComponent>) {
  }
}
