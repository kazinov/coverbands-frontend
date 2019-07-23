import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

import { environment } from '../../../environments/environment'; // once fixed can pull in as 'default as firebase' above

export interface FirebaseOptions {
  [key: string]: any;
}

@Injectable()
export class FirebaseService {
  private appInstance: firebase.app.App = firebase.initializeApp(environment.firebase);

  get app() {
    return this.appInstance;
  }

  constructor() {

  }
}
