import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TRANSLATIONS } from '@core/translation/translations';

@Component({
  selector: 'app-publish-artist-dialog',
  templateUrl: './publish-artist-dialog.component.html',
  styleUrls: ['./publish-artist-dialog.component.scss']
})
export class PublishArtistDialogComponent implements OnInit, OnDestroy {
  t = TRANSLATIONS;

  ngOnInit() {

  }

  constructor(
    private dialogRef: MatDialogRef<PublishArtistDialogComponent>
  ) {
  }

  ngOnDestroy(): void {
  }

}
