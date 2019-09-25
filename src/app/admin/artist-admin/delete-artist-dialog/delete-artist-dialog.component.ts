import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TRANSLATIONS } from '@core/translation/translations';
import { Artist } from '@core/artist/artist.model';

@Component({
  selector: 'app-delete-artist-dialog',
  templateUrl: './delete-artist-dialog.component.html',
  styleUrls: ['./delete-artist-dialog.component.scss']
})
export class DeleteArtistDialogComponent implements OnInit, OnDestroy {
  t = TRANSLATIONS;

  ngOnInit() {

  }

  get artistName() {
    return this.data && this.data.artist && this.data.artist.name;
  }

  constructor(
    private dialogRef: MatDialogRef<DeleteArtistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { artist: Artist }
  ) {
  }

  ngOnDestroy(): void {
  }

}
