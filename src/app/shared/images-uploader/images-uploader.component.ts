import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrls: ['./images-uploader.component.scss']
})
export class ImagesUploaderComponent implements OnInit {
  @Input() imagesUrls: string[];
  @Input() multipleUpload = false;
  @Input() max = 0;
  @Input() isLoading = false;
  @Output() imagesAttached = new EventEmitter<File[]>();
  @Output() imageDelete = new EventEmitter<string>();

  get maxImagesReached() {
    return !!this.max && this.imagesUrls && this.imagesUrls.length >= this.max;
  }

  ngOnInit() {

  }

  constructor() {
  }
}
