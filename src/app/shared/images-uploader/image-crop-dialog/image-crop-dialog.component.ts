import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: 'image-crop-dialog.component.html',
})
export class ImageCropDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ImageCropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onLoadClick() {
    this.dialogRef.close(
      'cropped!'
    )
  }

}