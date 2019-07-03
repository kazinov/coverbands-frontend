import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrls: ['./images-uploader.component.scss']
})
export class ImagesUploaderComponent implements OnInit {
  @Input() imagesUrls: string[];
  @Input() multipleUpload = false;
  @Output() imagesAttached = new EventEmitter<File[]>();

  constructor() {
  }

  ngOnInit() {

  }

}
