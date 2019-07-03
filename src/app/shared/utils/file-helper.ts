import {map} from 'rxjs/operators';
import { Observable ,  Subject } from 'rxjs';

export class FileHelper {
  static readFileAsDataURL(file: Blob): Observable<string> {
    const subject = new Subject<string>();
    const reader = new FileReader();
    reader.onload = (event: Event) => {
      const target = event.target as FileReader;
      subject.next(target.result as string);
      subject.complete();
    };
    reader.onerror = (event: Event) => {
      subject.error(event);
      subject.complete();
    };
    reader.readAsDataURL(file);
    return subject;
  }

  static readFileAsArrayBuffer(file: Blob): Observable<Uint8Array> {
    const subject = new Subject<Uint8Array>();
    const reader = new FileReader();
    reader.onload = (event: Event) => {
      const target = event.target as FileReader;
      subject.next(new Uint8Array(target.result as ArrayBuffer));
      subject.complete();
    };
    reader.onerror = (event: Event) => {
      subject.error(event);
      subject.complete();
    };
    reader.readAsArrayBuffer(file);
    return subject;
  }

  static readFileAsBinaryString(file: Blob): Observable<string> {
    return FileHelper.readFileAsArrayBuffer(file).pipe(map((array: Uint8Array) => {
      let binary = '';
      const length = array.byteLength;
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(array[i]);
      }
      return binary;
    }));
  }

  static getImageExtension(file: File) {
    if (file && file.name && file.name.length) {
      const ind = file.name.lastIndexOf('.');
      if (ind > -1 && ind + 1 < file.name.length - 1) {
        return file.name.slice(ind + 1, file.name.length);
      }
    }
    return null;
  }
}
