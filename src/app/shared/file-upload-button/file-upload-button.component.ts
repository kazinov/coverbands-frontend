import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

function globStringToRegex(str) {
  // parsing of the file type parameter (from angular-file-upload)
  if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
    return str.substring(1, str.length - 1);
  }
  const split = str.split(',');
  let result = '';
  if (split.length > 1) {
    for (let i = 0; i < split.length; i++) {
      result += '(' + globStringToRegex(split[i]) + ')';
      if (i < split.length - 1) {
        result += '|';
      }
    }
  } else {
    if (str.indexOf('.') === 0) {
      str = '*' + str;
    }
    result = '^' + str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '-]', 'g'), '\\$&') + '$';
    result = result.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
  }
  return result;
}

@Component({
  selector: 'app-file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss']
})
export class FileUploadButtonComponent implements OnInit {
  @Input() accept: string;
  @Input() multiple = false;
  @Output() filesAttached = new EventEmitter<File[]>();
  @ViewChild('input', { static: true }) input: ElementRef;
  private regexp;
  constructor() { }

  ngOnInit() {
    this.regexp = this.accept ? new RegExp(globStringToRegex(this.accept), 'gi') : null;
  }

  get inputElement(): HTMLInputElement {
    return this.input.nativeElement as HTMLInputElement;
  }

  onFilesAttached($event: Event) {
    const files = this.inputElement.files;
    if (files && files.length) {
      const filesArray = [];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (!this.regexp || file.type.match(this.regexp) || (file.name !== null && file.name.match(this.regexp))) {
          filesArray.push(file);
        }
      }
      this.filesAttached.emit(filesArray);
    }
  }

}
